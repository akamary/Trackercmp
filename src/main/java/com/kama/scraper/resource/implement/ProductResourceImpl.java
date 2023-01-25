package com.kama.scraper.resource.implement;

import com.kama.scraper.domain.Product;
import com.kama.scraper.resource.Resource;
import com.kama.scraper.service.IPageService;
import com.kama.scraper.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:3000")
public class ProductResourceImpl implements Resource<Product> {

    @Autowired
    private IService<Product> productService;

    @Autowired
    private IPageService<Product> productPageService;



    @Override
    public ResponseEntity<Page<Product>> findAll(Pageable pageable, String searchText) {
        System.out.println("findAll1");
        return new ResponseEntity<>(productPageService.findAll(pageable, searchText), HttpStatus.OK);
    }
    @Override
    public ResponseEntity<Collection<Product>> findAll(){
        System.out.println("findAll2");
        return new ResponseEntity<>(productService.findAll(),HttpStatus.OK);
    }
    @Override
    public ResponseEntity<Page<Product>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        System.out.println("findAll3");
        return new ResponseEntity<>(productPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending(): Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Product> findById(Long id) {
        System.out.println("findAll4");
        return new ResponseEntity<>(productService.findById(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Product> save(Product product) {
        System.out.println("findAll5");
        return new ResponseEntity<>(productService.saveOrUpdate(product), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Product> update(Product product) {
        System.out.println("findAll6");
        return null;
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        System.out.println("findAll7");
        return new ResponseEntity<>(productService.deleteById(id), HttpStatus.OK);
    }

}