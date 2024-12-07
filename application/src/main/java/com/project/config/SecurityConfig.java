package com.project.config;
import com.project.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private  final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)  // CSRF비활성화(JWT 사용시 필요없음)
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.addAllowedOrigin("http://localhost:3000"); // React 개발 서버 URL
                configuration.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
                configuration.addAllowedHeader("*"); // 모든 헤더 허용
                configuration.setAllowCredentials(true); // 인증 정보(Cookie, Authorization 헤더) 허용
                return configuration;
            }))
            .sessionManagement(session -> session   // 세션 정책: 무상태(JWT 인증이므로 세션 사용 안함)
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // URL별 접근 권한 설정
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/**", "/MyPoint","/login", "/login/oauth2/**", "/auth/signup", "/auth/signin").permitAll() // 메인 홈 및 로그인 경로 접근 허용
                .requestMatchers("/api/itemDetail/**").permitAll() // 특정 경로 인증 없이 접근 허용
                .requestMatchers("/admin/**").hasRole("admin") // 관리자 전용
                .anyRequest().authenticated() // 그 외 요청은 인증 필요
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }
}
