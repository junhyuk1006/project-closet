package com.project.security;

import com.project.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(TokenProvider tokenProvider, CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            // 토큰을 가져옵니다.
            String token = parseBearerToken(request);
            log.info("Filter is running...");

            // 토큰 검사하기. JWT이므로 인가 서버에 요청하지 않고도 검증 가능
            if (token != null && !token.equalsIgnoreCase("null")) {

            if (token != null && !token.equalsIgnoreCase("null")) {
                // JWT 토큰에서 인증에 필요한 정보만 추출합니다.
                Map<String, Object> userInfo = tokenProvider.validateAndGetUserId(token);
                String username = (String) userInfo.get("username"); // Username 가져오기

                log.info("Authenticated user ID : {}", userId);

                // CustomUserDetailsService를 통해 사용자 정보 로드
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                // 인증 객체 생성. SecurithContextHolder에 등록해야 인증된 사용자라고 생각한다.
                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, // 인증된 사용자 정보(UserDetails)
                        null,   // 인증된 사용자의 비밀번호 (null로 설정 가능)
                        userDetails.getAuthorities() // 권한 리스트
                );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // SecurityContext에 인증 정보 저장
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);  // SecurityContext에 설정
            }
        } catch (Exception ex) {
            logger.error("Could not authenticate user in security context", ex);
        }
        filterChain.doFilter(request, response);  // 필터 체인 계속 진행
    }

    // Authorization 헤더에서 Bearer 토큰을 파싱합니다.
    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("bearerToken : " + bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);  // "Bearer " 부분을 제거하고 토큰만 반환
        }
        return null;
    }
}
