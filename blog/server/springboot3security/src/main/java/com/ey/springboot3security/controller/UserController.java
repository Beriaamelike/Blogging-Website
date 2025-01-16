package com.ey.springboot3security.controller;

import com.ey.springboot3security.entity.AuthRequest;
import com.ey.springboot3security.entity.UserInfo;
import com.ey.springboot3security.service.JwtService;
import com.ey.springboot3security.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;


    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody UserInfo userInfo) {

        return service.addUser(userInfo);
    }


    @PostMapping("/generateToken")
    public ResponseEntity<String> generateToken(@RequestBody AuthRequest authRequest) {
        try {
            // Kullanıcıyı kimlik doğrulama
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            // Kimlik doğrulama başarılı ise, kullanıcı bilgilerini al
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());

            // JWT token'ı oluştur
            String token = jwtService.generateToken(userDetails);

            return ResponseEntity.ok(token); // Token'ı yanıt olarak döndür
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"); // Kimlik doğrulama başarısızsa hata döndür
        }
    }

}