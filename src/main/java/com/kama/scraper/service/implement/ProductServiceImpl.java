package com.kama.scraper.service.implement;

import com.kama.scraper.domain.Product;
import com.kama.scraper.repository.ProductRepository;
import com.kama.scraper.service.IPageService;
import com.kama.scraper.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


@Service
public class ProductServiceImpl implements IService<Product>, IPageService<Product> {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Collection<Product> findAll() {
        return (Collection<Product>) productRepository.findAll();
    }

    @Override
    public Page<Product> findAll(Pageable pageable, String searchText) {
        return productRepository.findAllProducts(pageable, searchText);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveOrUpdate(Product product) {
        return productRepository.save(product);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            productRepository.deleteById(id);
            jsonObject.put("message", "Book deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

}
