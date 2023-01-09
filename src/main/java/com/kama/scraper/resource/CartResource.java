package com.kama.scraper.resource;

import com.kama.scraper.config.JwtTokenFilter;
import com.kama.scraper.config.JwtTokenProvider;
import com.kama.scraper.domain.Cart;
import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.dto.AddToCartDto;
import com.kama.scraper.dto.CartDto;
import com.kama.scraper.repository.CartRepository;
import com.kama.scraper.repository.ProductRepository;
import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.CartService;
import com.kama.scraper.service.implement.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartResource {
    @Autowired
    private CartService cartService;
    private static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(CartResource.class);


    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody AddToCartDto addToCartDto, @RequestHeader("Authorization") String authorization){
        User user = userRepository.findById(addToCartDto.getUserId()).get();
        Product product = productRepository.findById(addToCartDto.getProductId()).get();
        List<Cart> cartList = cartRepository.findAllByUser(user);
        String token = authorization.substring("Bearer ".length());
        if (token != null) {
            try {
                String username = jwtTokenProvider.getUsernameFromToken(token);
                for (Cart cart : cartList) {
                    if (cart.getProduct().getId().equals(addToCartDto.getProductId())) {
                        Long qty = cart.getQuantity();
                        cart.setQuantity(qty + 1L);
                        addToCartDto.setQuantity(qty + 1L);
                        cartRepository.save(cart);
                        return new ResponseEntity<>(cart, HttpStatus.OK);
                    }
                }
                if (addToCartDto.getQuantity() == null) {

                    addToCartDto.setQuantity(1L);
                }

                System.out.println("product to add" + product.getName());
                //cartService.addToCart(addToCartDto, product, user);
                return new ResponseEntity<>(cartService.addToCart(addToCartDto, product, user), HttpStatus.CREATED);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable Long userId ) {
        System.out.println(userId);
        User user = userRepository.findById(userId).get();
        CartDto cartDto = cartService.listCartItems(user);
        return new ResponseEntity<>(cartDto,HttpStatus.OK);
    }

    @PutMapping(path = "/{userId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cart> updateCartItem(@PathVariable("userId") Long userId, @RequestBody AddToCartDto cartDto){
        try {
            User user = userRepository.findById(userId).get();
            Product product = productRepository.findById(cartDto.getProductId()).get();
            Cart cart = cartService.updateCartItem(cartDto, user,product);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("An error occurred while updating the cart item", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/cart/{userId}/{productId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long userId,@PathVariable Long productId) {
        User user = userRepository.findById(userId).get();
        cartService.deleteCartItem(productId, userId,user);
        return new ResponseEntity<>( "Item has been removed", HttpStatus.OK);
    }
}