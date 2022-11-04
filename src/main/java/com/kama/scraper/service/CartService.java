package com.kama.scraper.service;

import com.kama.scraper.CartCost;
import com.kama.scraper.domain.Cart;
import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.dto.AddToCartDto;
import com.kama.scraper.dto.CartDto;
import com.kama.scraper.dto.CartItemDto;
import com.kama.scraper.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public CartService() {
    }

    public Cart addToCart(AddToCartDto addToCartDto, Product product, User user){
        Cart cart = new Cart(product, addToCartDto.getQuantity(), user);
        return cartRepository.save(cart);
    }


    public CartDto listCartItems(User user) {
        List<Cart> cartList = cartRepository.findAllByUser(user);
        List<CartItemDto> cartItems = new ArrayList<>();
        for (Cart cart:cartList){
            CartItemDto cartItemDto = getDtoFromCart(cart);
            cartItems.add(cartItemDto);
        }
        double totalCost = 0;
        for (CartItemDto cartItemDto :cartItems){
            String str = cartItemDto.getProduct().getPrice();
            str = str.replaceAll("[^\\d.]", "");
            double price = Double.parseDouble(str);
            double cost = price* cartItemDto.getQuantity();
            totalCost += cost;
        }
        return new CartDto(cartItems,totalCost);
    }


    public static CartItemDto getDtoFromCart(Cart cart) {
        return new CartItemDto(cart);
    }



    public Cart updateCartItem(AddToCartDto cartDto, User user, Product product) {
        Cart cart = new Cart();
       List<Cart> cartList = cartRepository.findAllByUser(user);
       for(Cart c : cartList){
           if(c.getProduct().getId().equals(cartDto.getProductId())){
               c.setQuantity(cartDto.getQuantity());
               c.setProduct(product);
               c.setUser(user);

               return cartRepository.save(c);
           }
       }
        cart.setUser(user);
       cart.setProduct(product);
        cart.setQuantity(cartDto.getQuantity());
        return cartRepository.save(cart);
    }

    public String deleteCartItem(Long productId, Long userId,User user) {
        List<Cart> cartList = cartRepository.findAllByUser(user);
        for(Cart c : cartList){
            if(c.getProduct().getId().equals(productId)){
                cartRepository.deleteById(c.getId());
                return "ok";
            }
        }

        return "error";

    }


}
