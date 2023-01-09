package com.kama.scraper.config;

import com.kama.scraper.service.implement.UserDetailsServiceImpl;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtTokenConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private JwtTokenProvider tokenProvider;

    private UserDetailsServiceImpl userDetailsService;

    public JwtTokenConfigurer(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(new JwtTokenFilter(tokenProvider, userDetailsService), UsernamePasswordAuthenticationFilter.class);
    }
}