package com.ey.springboot3security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.ey.springboot3security.repository.UserInfoRepository;
import com.ey.springboot3security.entity.UserInfo;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByUsername(username);

        UserInfo userInfo = userInfoOptional.orElseThrow(() ->
                new UsernameNotFoundException("User not found with username: " + username));

        System.out.println("User found: " + userInfo.getUsername()); // Log ekleyin

        return User.withUsername(userInfo.getEmail())
                .password(userInfo.getPassword())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }

}
