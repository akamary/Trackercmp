package com.kama.scraper.config;

import com.kama.scraper.domain.User;
import com.kama.scraper.repository.UserRepository;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;

public class JwtTokenFilter extends OncePerRequestFilter {
    private static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);

    @Autowired
    private UserRepository userRepository;

    private JwtTokenProvider tokenProvider;

    public JwtTokenFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }



    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.info("JwtTokenFilter : doFilterInternal");
        String token = request.getHeader("Authorization");
        //String email = request.getHeader("email");
        //Authentication auth = tokenProvider.getAuthentication(email);

        if (token != null) {
            try {
                Claims claims = tokenProvider.getClaimsFromToken(token);

                    if (!claims.getExpiration().before(new Date())) {
                        Authentication authentication = tokenProvider.getAuthentication(claims.getSubject());
                        if (authentication.isAuthenticated()) {
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                    }
               // }
            } catch (RuntimeException e) {
                try {
                    SecurityContextHolder.clearContext();
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().println(
                            new JSONObject().put("exception", "expired or invalid JWT token " + e.getMessage()));
                } catch (IOException | JSONException e1) {
                    e1.printStackTrace();
                }
                return;
            }
        } else {
            log.info("first time so creating token using UserResourceImpl - authenticate method");
        }
        filterChain.doFilter(request, response);
    }
}
