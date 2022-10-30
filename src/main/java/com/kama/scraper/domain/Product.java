package com.kama.scraper.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_product")
public class Product {

    @Id
    @SequenceGenerator(
            name = "product_sequence",
            sequenceName = "product_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    private Long id;


    private String name;
    private String price;
    @ManyToOne
    @JoinTable(
            name = "user_products",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private User user ;
    public Product(Long id, String name, String price, Long p_qty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.p_qty = p_qty;
    }

    public Product(String name, String price, Long p_qty) {
        this.name = name;
        this.price = price;
        this.p_qty = p_qty;
    }

    public Long getP_qty() {
        return p_qty;
    }

    public void setP_qty(Long p_qty) {
        this.p_qty = p_qty;
    }

    private Long p_qty;

    public Product(String name, String price, String image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    private String image;

    public Product(Long id, String name, String price, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }


    public Product() {}

    public Product(String name, String price) {
        this.name = name;
        this.price = price;
    }

    public Product(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Product(Long id, String name, String price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }




    public Long getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
    public User getUserProducts(Long userId) {

        return user;
    }
    public void deleteFromUser(User user){

        //userProducts.remove(user);
    }
    public void setUserProducts(User userProducts) {
        this.user = userProducts;
    }

    public void saveToUser(User user,Product product) {
        this.user=user;
        this.user.addToMyProduct(product);
    }
}


