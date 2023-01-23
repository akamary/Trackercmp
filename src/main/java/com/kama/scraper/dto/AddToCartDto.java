package com.kama.scraper.dto;

import com.kama.scraper.domain.Cart;

public class AddToCartDto {
    private Long id;
    private Long userId;
    private Long productId;
    private String username;
    private Long quantity;

    public AddToCartDto(Long userId,Long productId, Long quantity, String username) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.username = username;
    }

    public AddToCartDto(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    }

    public AddToCartDto(Long id, Long userId, Long productId, Long quantity) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public AddToCartDto() {
    }

    public AddToCartDto(Long id, Long userId, Long productId, Long quantity, String username) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.username=username;
    }

    public AddToCartDto(Cart cart) {
        this.setId(cart.getId());

        this.setProductId(cart.getProductId());
        this.setUserId(cart.getUserId());
        this.setQuantity(cart.getQuantity());
        this.setUsername(cart.getUser().getUsername());
    }

    public AddToCartDto(Long userId, Long productId, Long quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "AddToCartDto{" +
                "id=" + id +
                ", userId=" + userId +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ", username='" + username + '\'' +
                '}';
    }
}
