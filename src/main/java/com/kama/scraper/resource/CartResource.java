package com.kama.scraper.resource;


import com.kama.scraper.config.JwtTokenFilter;
import com.kama.scraper.domain.Cart;
import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.dto.AddToCartDto;
import com.kama.scraper.dto.CartDto;
import com.kama.scraper.repository.ProductRepository;
import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartResource {
    @Autowired
    private CartService cartService;
    private static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    private static final Logger logger = LoggerFactory.getLogger(CartResource.class);

    @PreAuthorize("#addToCartDto.username.toString() == authentication.name")
    @PostMapping(value = "/add",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addToCart(@RequestBody AddToCartDto addToCartDto) {
        try {
            User user = userRepository.findById(addToCartDto.getUserId()).orElse(null);
            Product product = productRepository.findById(addToCartDto.getProductId()).orElse(null);
            if (user != null && product != null && user.getUsername().equals(addToCartDto.getUsername())) {

                    cartService.addToCart(user,product,addToCartDto.getQuantity());
                return new ResponseEntity<>("Product added to cart successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("You are not allowed to access this resource!", HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while adding product to cart!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable Long userId ) {
        User user = userRepository.findById(userId).get();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(user!=null && user.getUsername().equals(auth.getName())){
            CartDto cartDto = cartService.listCartItems(user);
            System.out.println("in Cart");
            return new ResponseEntity<>(cartDto,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }

    }

    @PreAuthorize("#addToCartDto.username.toString() == authentication.name && #userId == #addToCartDto.userId")
    @PutMapping(path = "/{userId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CartDto> updateCartItem(@RequestBody AddToCartDto addToCartDto,@PathVariable("userId") Long userId){
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
            Product product = productRepository.findById(addToCartDto.getProductId()).orElseThrow(() -> new IllegalArgumentException("Product not found"));
            Cart cart = cartService.updateCartItem( user,product,addToCartDto.getQuantity());
            if(cart == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            CartDto cartDto2 = cartService.listCartItems(user);
            System.out.println(cartDto2);
            return new ResponseEntity<>(cartDto2, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("An error occurred while updating the cart item", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long userId, @PathVariable Long productId) {
        User user = userRepository.findById(userId).get();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (user != null && auth.getName().equals(user.getUsername())) {
            if(cartService.deleteCartItem(productId, userId, user)) return new ResponseEntity<>("Item has been removed", HttpStatus.OK);
            else return new ResponseEntity<>("No such product!", HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>("You are not allowed to access this resource!", HttpStatus.FORBIDDEN);
        }
    }
}

