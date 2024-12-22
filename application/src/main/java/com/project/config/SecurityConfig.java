package com.project.config;

import com.project.security.JwtAuthenticationFilter;
import com.project.security.OAuth2AuthenticationSuccessHandler;
import com.project.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DefaultSecurityFilterChain securityFilterChain(HttpSecurity http, CustomOAuth2UserService customOAuth2UserService) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)  // CSRF비활성화(JWT 사용시 필요없음)
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.addAllowedOrigin("http://13.209.5.239"); // React 개발 서버 URL
                configuration.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
                configuration.addAllowedHeader("*"); // 모든 헤더 허용
                configuration.setAllowCredentials(true); // 인증 정보(Cookie, Authorization 헤더) 허용
                return configuration;
            }))
                // 세션 정책 수정: JWT는 무상태, 이메일 인증은 세션 사용
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)) // 세션 허용

            // URL별 접근 권한 설정
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/error", "/MyPoint","/login", "/oauth2/authorization/**").permitAll() // 메인 홈 및 로그인 경로 접근 허용
                .requestMatchers("/api/**").permitAll() // /api 하위 경로 모두 허용
                .requestMatchers("/book/coordi/**").permitAll()
                .requestMatchers("/admin/**").hasRole("admin") // 관리자 전용
                .anyRequest().authenticated() // 그 외 요청은 인증 필요
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                        .userService(customOAuth2UserService)
                )
                .successHandler(oAuth2AuthenticationSuccessHandler)
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();



    }

}
