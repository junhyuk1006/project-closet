package com.project.service;

import com.project.domain.Users;
import com.project.dto.CustomUserDetails;
import com.project.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public  CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        System.out.println("토큰 순서:2");
        // 데이터베이스에서 사용자 조회
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // CustomUserDetails 객체로 변환
        return new CustomUserDetails(user);
    }
}
