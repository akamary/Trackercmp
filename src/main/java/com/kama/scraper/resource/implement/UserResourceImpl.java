package com.kama.scraper.resource.implement;

import com.kama.scraper.config.JwtTokenProvider;
import com.kama.scraper.domain.User;
import com.kama.scraper.dto.AuthenticateRequestDTO;
import com.kama.scraper.repository.RoleRepository;
import com.kama.scraper.repository.UserRepository;
import com.kama.scraper.service.IService;
import com.kama.scraper.service.implement.UserDetailsServiceImpl;
import com.kama.scraper.utils.ConstantUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResourceImpl {

    private static Logger log = LoggerFactory.getLogger(UserResourceImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IService<User> userService;


    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody AuthenticateRequestDTO body) {

        JSONObject jsonObject = new JSONObject();
        User user = userRepository.findByUsername(body.getUsername()).get();

        if(userRepository.findByUsername(user.getUsername()) != null) return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        log.info("UserResourceImpl : register");

        try {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setRole(roleRepository.findByName(ConstantUtils.USER.toString()));
            User savedUser = userRepository.saveAndFlush(user);
            jsonObject.put("message", savedUser.getUsername() + " saved succesfully");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody AuthenticateRequestDTO body) {
        log.info("UserResourceImpl : authenticate");

        JSONObject jsonObject = new JSONObject();
        try {
            User user = userRepository.findByUsername(body.getUsername()).get();
            System.out.println("1" + user.getUsername());
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));
            if (authentication.isAuthenticated()) {
                String token = tokenProvider.createToken(body.getUsername(),user.getRole());
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                //jsonObject.put("token", tokenProvider.createToken(body.getUsername(), user.getRole()));
                jsonObject.put("token", token);
                jsonObject.put("id", user.getId());
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception in here", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }



}