package com.kama.scraper.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String fullname;
    @Column(nullable = false)
    private String email;
    @Column
    private Long qty;
    @Column(nullable = false)
    private String password;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Product> myProducts = new HashSet<>();

    public User(Long id, String username, String fullname, String email, Long qty) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.qty = qty;
    }

    public User(Long id, String username, String fullname, String email, Long qty, String password, Role role) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.qty = qty;
        this.password = password;
        this.role = role;
    }

    public User(String username, String fullname, String email, Long qty, String password) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.qty = qty;
        this.password = password;
    }

    public User(String username, String fullname, String email, Long qty, String password, Role role) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.qty = qty;
        this.password = password;
        this.role = role;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUserame(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Product> getMyProducts() {
        return this.myProducts;
    }

    public void addToMyProduct(Product product){
        this.myProducts.add(product);
    }
    public void setMyProducts(Set<Product> myProducts) {

        this.myProducts = myProducts;
    }

    public Long getQty() {
        Long total=0L;
        for(Product p:myProducts){
            total+=p.getP_qty();
        }
        qty=total;
        return qty;
    }

    public void setQty(Long qty) {

        this.qty = qty;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

}
