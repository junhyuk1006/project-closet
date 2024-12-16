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

    private final TokenProvider tokenProvider; // JWT 토큰을 검증하고 파싱하는 역할
    private final CustomUserDetailsService customUserDetailsService; // 사용자 정보를 로드하는 서비스

    // 생성자: 필요한 의존성 주입
    public JwtAuthenticationFilter(TokenProvider tokenProvider, CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * HTTP 요청이 필터 체인을 통과할 때 실행되는 메서드
     * 여기서 JWT 토큰을 검증하고 인증 정보를 SecurityContext에 저장합니다.
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            // 1. 요청 헤더에서 토큰 가져오기
            String token = parseBearerToken(request);
            log.info("Filter is running...");

            // 2. 토큰이 존재하고 null이 아니면 검증 시작
            if (token != null && !token.equalsIgnoreCase("null")) {

                // 3. 토큰을 검증하고 사용자 정보를 가져오기
                Map<String, Object> userInfo = tokenProvider.validateAndGetUserId(token);
                Long userId = (Long) userInfo.get("id"); // ID 가져오기
                String username = (String) userInfo.get("username"); // Username 가져오기

                log.info("Token validation result: {}", userInfo);

                // 4. 사용자 정보를 로드 (DB에서 사용자 정보 조회)
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                // 5. 인증 객체 생성 (SecurityContext에 저장할 인증 정보)
                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, // 인증된 사용자 정보(UserDetails)
                        null, // 비밀번호는 필요 없음
                        userDetails.getAuthorities() // 사용자 권한 정보
                );

                // 6. 인증 객체에 요청 세부 정보를 추가
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 7. SecurityContext에 인증 정보 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            // 인증 과정에서 예외가 발생하면 로그로 남김 (실제 애플리케이션에서는 적절한 응답 처리 필요)
            log.error("Could not user authenticate in security context", ex);
        }

        // 8. 필터 체인의 다음 필터로 요청을 전달
        filterChain.doFilter(request, response);
    }

    /**
     * 요청 헤더에서 Bearer 토큰을 파싱하는 메서드
     *
     * @param request HTTP 요청
     * @return Bearer 토큰 문자열 (Bearer 키워드를 제외한 실제 토큰)
     */
    private String parseBearerToken(HttpServletRequest request) {
        // Authorization 헤더에서 토큰 추출
        String bearerToken = request.getHeader("Authorization");
        System.out.println("bearerToken : " + bearerToken);

        // Bearer 토큰 형식인지 확인 후 실제 토큰 부분만 반환
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7); // "Bearer " 이후의 문자열 반환
        }
        return null; // 토큰이 없거나 형식이 올바르지 않으면 null 반환
    }
}