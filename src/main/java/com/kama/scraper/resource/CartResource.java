package com.kama.scraper.resource;

import com.kama.scraper.domain.Cart;
import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.dto.AddToCartDto;
import com.kama.scraper.dto.CartDto;
import com.kama.scraper.repository.CartRepository;
import com.kama.scraper.repository.ProductRepository;
import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.CartService;
import com.kama.scraper.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartResource {
    @Autowired
    private CartService cartService;

    @Autowired
    private IService<Product> productService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add/{userId}/{productId}")
    public ResponseEntity<Cart> addToCart(@RequestBody AddToCartDto addToCartDto, @PathVariable Long userId, @PathVariable Long productId) {
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();
        List<Cart> cartList = cartRepository.findAllByUser(user);
        for(Cart cart:cartList){
            if(cart.getProduct().getId().equals(productId)){
                //Long qty1 = addToCartDto.getQuantity();
                Long qty = cart.getQuantity();
                cart.setQuantity(qty+1L);
                addToCartDto.setQuantity(qty+1L);
                cartRepository.save(cart);
                return new ResponseEntity<>(cart, HttpStatus.OK);
            }
        }
        if(addToCartDto.getQuantity()==null){

            addToCartDto.setQuantity(1L);
        }

        System.out.println("product to add"+  product.getName());
        //cartService.addToCart(addToCartDto, product, user);
        return new ResponseEntity<>(cartService.addToCart(addToCartDto, product, user), HttpStatus.CREATED);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDto> getCartItems(@PathVariable Long userId){
        User user = userRepository.findById(userId).get();
        CartDto cartDto = cartService.listCartItems(user);
        return new ResponseEntity<CartDto>(cartDto,HttpStatus.OK);
    }

    @PutMapping(path = "/user/{userId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long userId, @RequestBody AddToCartDto cartDto){
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(cartDto.getProductId()).get();
        //.updateCartItem(cartDto, user,product);
        return new ResponseEntity<>(cartService.updateCartItem(cartDto, user,product), HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}/{productId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long userId,@PathVariable Long productId) {
        User user = userRepository.findById(userId).get();
        //int userId = authenticationService.getUser(token).getId();
        cartService.deleteCartItem(productId, userId,user);
        return new ResponseEntity<>( "Item has been removed", HttpStatus.OK);
    }
}