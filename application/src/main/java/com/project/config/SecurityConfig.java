package com.project.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    //private final CustomOAuth2UserService oauth2UserService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login", "/login/oauth2/**", "/auth/signup", "/auth/signin").permitAll() // 메인 홈 및 로그인 경로 접근 허용
                .requestMatchers("/admin/**").hasRole("admin") // 관리자 전용
                .anyRequest().authenticated() // 그 외 요청은 인증 필요
            )
            .csrf(AbstractHttpConfigurer::disable) ;// CSRF 비활성화
//            .oauth2Login(oauth2 -> oauth2
//                .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
//                    .defaultSuccessUrl("/")
//                            .failureUrl("/login?error=true")
//                );

        return http.build();

        // JWT 필터 추가
        //http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
