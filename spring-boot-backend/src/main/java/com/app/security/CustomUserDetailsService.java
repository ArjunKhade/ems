package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserRepository;
import com.app.pojos.User;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       
    	log.info("Loading user by email: {}", email);

        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID"));

        log.info("User found: {}", user);
        
        return new CustomUserDetails(user);
    }
}
