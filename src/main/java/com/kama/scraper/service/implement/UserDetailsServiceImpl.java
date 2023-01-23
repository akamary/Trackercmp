package com.kama.scraper.service.implement;

import com.kama.scraper.domain.User;
import com.kama.scraper.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    private Long userId;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).get();
        user.setId(user.getId());
        if (user == null) {
            throw new UsernameNotFoundException("username " + username + " not found");
        }
        System.out.println(user.getUsername());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                getGrantedAuthority(user));
    }

    private Collection<GrantedAuthority> getGrantedAuthority(User user) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getRole().getName().equalsIgnoreCase("admin")) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }

    public Long getId() {
        return userId;
    }
    public void setId(Long id) {
        this.userId = id;
    }
}