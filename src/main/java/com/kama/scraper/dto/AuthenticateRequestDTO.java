package com.kama.scraper.dto;

public class AuthenticateRequestDTO {
    private Long userId;
    private String username;
    private String password;
    private Long quantity;
    private Long productId;

    private String email;



    private  String fullname;
    public AuthenticateRequestDTO(Long userId, String username, String password, Long quantity) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.quantity = quantity;
    }

    public AuthenticateRequestDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public AuthenticateRequestDTO(String username) {
        this.username = username;
    }

    public AuthenticateRequestDTO(Long userId, String username, String password, Long quantity, Long productId) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.quantity = quantity;
        this.productId = productId;
    }

    public AuthenticateRequestDTO() {
    }

    public AuthenticateRequestDTO(String username, String password, String email, String fullname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullname = fullname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    @Override
    public String toString() {
        return "AuthenticateRequest{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", quantity=" + quantity +
                ", productId='" + productId + '\'' +
                '}';
    }
}
