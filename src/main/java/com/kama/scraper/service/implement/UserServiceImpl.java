package com.kama.scraper.service.implement;

import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.User;
import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements IService<User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveOrUpdate(User user) {
        return userRepository.save(user);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            userRepository.deleteById(id);
            jsonObject.put("message", "User deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

    @Override
    public void save(User product) {

    }

    @Override
    public User save(Long productId, Long userId) {
        return null;
    }

    @Override
    public String deleteFromUser(Long productId, Long userId) {
        return null;
    }

    @Override
    public Set<User> getProducts(Long userId) {
        return null;
    }

    @Override
    public Product updateProductQty(Long userId,Product product) {
        return null;
    }



}

