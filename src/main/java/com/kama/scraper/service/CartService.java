package com.kama.scraper.service;

import com.kama.scraper.domain.Cart;
import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.dto.CartDto;
import com.kama.scraper.dto.CartItemDto;
import com.kama.scraper.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void addToCart(User user, Product product, Long quantity) {
        Cart cart = cartRepository.findByUserAndProduct(user, product);
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
            cartRepository.save(cart);
        } else {
            cart.setQuantity(cart.getQuantity() + quantity);
            cartRepository.save(cart);
        }
    }

    public CartDto listCartItems(User user) {
        List<Cart> cartList = cartRepository.findAllByUserOrderByProduct(user);
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
            double cost;
            if(cartItemDto.getQuantity() != null) cost = price* cartItemDto.getQuantity();
            else cost = price;
            totalCost += cost;
        }
        return new CartDto(cartItems,totalCost);
    }


    public static CartItemDto getDtoFromCart(Cart cart) {
        return new CartItemDto(cart);
    }


    public Cart updateCartItem( User user, Product product, Long qty) {
        Cart cart = new Cart();
        List<Cart> cartList = cartRepository.findAllByUser(user);
        for(Cart c : cartList){
            if(c.getProduct().getId().equals(product.getId())){
                c.setQuantity(qty);
                c.setProduct(product);
                c.setUser(user);
                return cartRepository.save(c);
            }
        }
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(qty);
        System.out.println("in update Cart");
        return cartRepository.save(cart);
    }

    public boolean deleteCartItem(Long productId, Long userId,User user) {
        List<Cart> cartList = cartRepository.findAllByUser(user);
        for(Cart c : cartList){
            if(c.getProduct().getId().equals(productId)){
                cartRepository.deleteById(c.getId());
                return true;
            }
        }
        return false;
    }
}
