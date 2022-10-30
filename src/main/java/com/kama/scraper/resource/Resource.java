package com.kama.scraper.resource;

import com.kama.scraper.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

public interface Resource<T> {
    @GetMapping("/search/{searchText}")
    ResponseEntity<Page<T>> findAll(Pageable pageable, @PathVariable String searchText);
    @GetMapping("/all")
    ResponseEntity<Collection<T>> findAll();
    @GetMapping
    ResponseEntity<Page<T>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir);

    @GetMapping("{id}")
    ResponseEntity<T> findById(@PathVariable Long id);

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<T> save(@RequestBody T t);

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<T> update(@RequestBody T t);

    @DeleteMapping("{id}")
    ResponseEntity<String> deleteById(@PathVariable Long id);


    @DeleteMapping("/{productId}/users/{userId}")
     ResponseEntity<String> deleteFromUser(@PathVariable Long productId, @PathVariable Long userId);
    @PostMapping("/{productId}/users/{userId}")
     ResponseEntity<Product> productsToUser(@PathVariable Long productId, @PathVariable Long userId);

    @GetMapping("/user/{userId}")
     ResponseEntity<Set<Product>> getProducts(@PathVariable Long userId);
}
