package com.project.security;

import com.project.dto.CustomOAuth2User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // JWT 생성
        String token = tokenProvider.create(((CustomOAuth2User) authentication.getPrincipal()).getUser());

        // React 프론트엔드로 리디렉션하며 JWT를 쿼리 파라미터로 전달
        String targetUrl = "http://13.209.5.239:3000/oauth2/redirect?token=" + token;
        log.info("targetUrl: {}", targetUrl);
        response.sendRedirect(targetUrl);
    }
}
