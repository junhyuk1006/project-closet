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
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private  final JwtAuthenticationFilter jwtAuthenticationFilter;
    private  final CustomOAuth2UserService customOAuth2UserService;
    private  final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomOAuth2UserService customOAuth2UserService) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)  // CSRF비활성화(JWT 사용시 필요없음)

            .sessionManagement(session -> session   // 세션 정책: 무상태(JWT 인증이므로 세션 사용 안함)
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // URL별 접근 권한 설정
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/**", "/MyPoint","/login", "/oauth2/authorization/**", "/api/auth/signup", "/api/auth/signin").permitAll() // 메인 홈 및 로그인 경로 접근 허용
                .requestMatchers("/api/itemDetail/**").permitAll() // 특정 경로 인증 없이 접근 허용
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
