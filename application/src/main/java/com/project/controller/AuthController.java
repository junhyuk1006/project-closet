package com.project.controller;

import com.project.security.TokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final TokenProvider tokenProvider;

    public AuthController(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            tokenProvider.validateAndGetUserId(token); // JWT 검증 및 사용자 정보 추출
            return ResponseEntity.ok().body("Token is valid");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }
}
