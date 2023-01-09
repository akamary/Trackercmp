package com.kama.scraper.config;

import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.implement.UserDetailsServiceImpl;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class JwtTokenFilter extends OncePerRequestFilter {

    private static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider, UserDetailsServiceImpl userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
            log.info("JwtTokenFilter : doFilterInternal");

            String token = request.getHeader("Authorization");
            String username;
            Claims claims;
            if (token != null) {
                try {
                    String requestUrl = request.getRequestURI();
                    if (token.startsWith("Bearer ")) {
                        token = token.substring(7);
                        claims = jwtTokenProvider.getClaimsFromToken(token);
                        username = jwtTokenProvider.getUsernameFromToken(token);
                        System.out.println(username + claims.getSubject().toString());
                    } else {
                        claims = jwtTokenProvider.getClaimsFromToken(token);
                        username = jwtTokenProvider.getUsernameFromToken(token);
                    }

                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        if (requestUrl.startsWith("/rest/user/authenticate")) {
                            filterChain.doFilter(request, response);
                        } else if (requestUrl.startsWith("/rest/cart")) {
                            BufferedReader reader = request.getReader();
                            StringBuilder sb = new StringBuilder();
                            String line;
                            while ((line = reader.readLine()) != null) {
                                sb.append(line);
                            }
                            String requestBody = sb.toString();
                            JSONObject jsonObject = new JSONObject(requestBody);

                            String requestedUsername = jsonObject.getString("username");
                            if (username.equals(requestedUsername.toString())) {
                                Authentication authentication = jwtTokenProvider.getAuthentication(username);
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                            }else{
                                try {
                                    SecurityContextHolder.clearContext();
                                    response.setContentType("application/json");
                                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                    response.getWriter().println(
                                            new JSONObject().put("exception", "expired or invalid JWT token in TFilter" ));
                                }catch (IOException | JSONException e1) {
                                    e1.printStackTrace();
                                }
                                return;
                        }
                    }
                }
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            } else {
                log.info("first time so creating token using UserResourceImpl - authenticate method");
            }
        filterChain.doFilter(request, response);
    }
}