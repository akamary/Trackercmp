package com.kama.scraper.service.implement;

import com.kama.scraper.domain.Product;
import com.kama.scraper.domain.Role;
import com.kama.scraper.repository.RoleRepository;
import com.kama.scraper.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@Service
public class RoleServiceImpl implements IRoleService<Role> {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Collection<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role saveOrUpdate(Role role) {
        return roleRepository.saveAndFlush(role);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            roleRepository.deleteById(id);
            jsonObject.put("message", "Role deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

    @Override
    public void save(Role product) {

    }

    @Override
    public Role save(Long productId, Long userId) {
        return null;
    }

    @Override
    public String deleteFromUser(Long productId, Long userId) {
        return null;
    }

    @Override
    public Set<Role> getProducts(Long userId) {
        return null;
    }

    @Override
    public Product updateProductQty(Product product, Long userId) {
        return null;
    }
}
