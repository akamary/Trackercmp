package com.kama.scraper.repository;

import com.kama.scraper.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    @Query("FROM Product b WHERE b.name LIKE %:searchText% OR b.price LIKE %:searchText% ORDER BY b.price ASC")
    Page<Product> findAllProducts(Pageable pageable, @Param("searchText") String searchText);

}
