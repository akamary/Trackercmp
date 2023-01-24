package com.kama.scraper.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String username;

    private String fullname;

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

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String fullname, String email, String password, Role role) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

    public User(String username, Role role) {
        this.username = username;
        this.role = role;
    }


    public User(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public User(String username, String fullname, String email, String password) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
    }

    public User(String username, String fullname, String email) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
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


    public Product getProdDetails(Product product){
        boolean inCart = false;
        for(Product p:myProducts){
            if(p.getId()==product.getId()){
                inCart = true;
                p.setId(product.getId());
                p.setName(product.getName());
                p.setPrice(product.getPrice());
                //p.setP_qty(product.getP_qty());
                p.setImage(product.getImage());
                return p;
            }
        }
        if(inCart==false) {
            myProducts.add(product);
        }
        return product;
    }
}