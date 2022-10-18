package com.kama.scraper.service;

import com.kama.scraper.domain.Product;

import java.util.Collection;
import java.util.Optional;

public interface IService<T>{
    Collection<T> findAll();

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);

    void save(T product);

    T save(Long productId, Long userId);
}
