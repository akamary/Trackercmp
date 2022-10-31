package com.kama.scraper.service;

import com.kama.scraper.domain.Product;
import org.springframework.http.ResponseEntity;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

public interface IService<T>{
    Collection<T> findAll();

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);

    void save(T product);

    T save(Long productId, Long userId);

    String deleteFromUser(Long productId, Long userId);

    Set<T> getProducts(Long userId);

    Product updateProductQty( Product product, Long userId);
}
