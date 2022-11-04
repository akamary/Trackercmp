package com.kama.scraper.service.implement;

import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.repository.ProductRepository;
import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.IPageService;
import com.kama.scraper.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;


@Service
public class ProductServiceImpl implements IService<Product>, IPageService<Product> {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;
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
    public Product save(Long productId, Long userId){
        Product product = productRepository.findById(productId).get();
        User user = userRepository.findById(userId).get();
        Long qty = product.getP_qty();
        product.setP_qty(qty+1L);
        product.saveToUser(user,product);
        return productRepository.save(product);
    }
    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            productRepository.deleteById(id);
            jsonObject.put("message", "Product deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
    @Override
    public String deleteFromUser(Long productId, Long userId){
        JSONObject jsonObject = new JSONObject();
        Product product = productRepository.findById(productId).get();
        User user = userRepository.findById(userId).get();
        product.setP_qty(0L);
        product.deleteFromUser(user,product);
        productRepository.delete(product);
        return "deleted";
    }

    @Override
    public Set<Product> getProducts(Long userId) {
        return userRepository.findById(userId).get().getMyProducts();
    }

    @Override
    public Product updateProductQty(Long userId,Product product) {
        User user = userRepository.findById(userId).get();
        Product newProd = user.getProdDetails(product);
        return productRepository.save(newProd);

        //Product p = user.getProdDetails(product,qty);
        //productRepository.save(product);
    }


    @Override
    public void save(Product product) {
        productRepository.save(product);
    }


//        public List<Product> listProducts() {
//            List<Product> products = productRepository.findAll();
//            List<Product> productDtos = new ArrayList<>();
//            for(Product product : products) {
//                Product productDto = product;
//                productDtos.add(productDto);
//            }
//            return productDtos;
//        }

//        public static Product getDtoFromProduct(Product product) {
//            Product productDto = new Product(product);
//            return productDto;
//        }

//        public static Product getProductFromDto(Product productDto, Category category) {
//            Product product = new Product(productDto, category);
//            return product;
//        }

        public void addProduct(Product productDto) {
            Product product = productDto;
            productRepository.save(product);
        }

//        public void updateProduct(Long productId, ProductDto productDto, Category category) {
//            Product product = getProductFromDto(productDto, category);
//            product.setId(productID);
//            productRepository.save(product);
//        }
//
//
//        public Product getProductById(Integer productId) throws ProductNotExistException {
//            Optional<Product> optionalProduct = productRepository.findById(productId);
//            if (!optionalProduct.isPresent())
//                throw new ProductNotExistException("Product id is invalid " + productId);
//            return optionalProduct.get();
//        }



}