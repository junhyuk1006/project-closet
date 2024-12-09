package com.project.security;

import com.project.domain.Users;
import com.project.service.UsersService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final UsersService usersService;  // 사용자 정보 조회용 서비스

    public JwtAuthenticationFilter(TokenProvider tokenProvider, UsersService usersService) {
        this.tokenProvider = tokenProvider;
        this.usersService = usersService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            // 토큰을 가져옵니다.
            String token = parseBearerToken(request);
            log.info("Filter is running...");

            if (token != null && !token.equalsIgnoreCase("null")) {
                // JWT 토큰에서 인증에 필요한 정보만 추출합니다.
                Map<String, Object> userInfo = tokenProvider.validateAndGetUserId(token);
                String username = (String) userInfo.get("username"); // Username 가져오기

                log.info("Authenticated user: {}", username);

                // 데이터베이스에서 사용자 정보를 조회합니다. userId를 사용하여 조회합니다.
                Users user = usersService.getUserByUsername(username);  // 사용자 정보를 username으로 조회

                // CustomUserDetails 객체 생성
                CustomUserDetails customUserDetails = CustomUserDetails.builder()
                        .id(user.getId())  // DB에서 가져온 userId
                        .username(user.getUsername())  // DB에서 가져온 username
                        .nickname(user.getNickname())  // DB에서 조회한 닉네임
                        .email(user.getEmail())        // DB에서 조회한 이메일
                        .profileImage(user.getProfileImage())  // DB에서 조회한 프로필 이미지
                        .phone(user.getPhone())         // DB에서 조회한 전화번호
                        .birth(user.getBirth())         // DB에서 조회한 생년월일
                        .build();

                // 인증 완료 후, SecurityContext에 사용자 정보 등록
                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        customUserDetails, // 인증된 사용자 정보
                        null,   // JWT 인증에서는 패스워드가 필요 없으므로 null
                        AuthorityUtils.NO_AUTHORITIES); // 권한은 사용하지 않음 (필요시 추가 가능)

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
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

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);  // "Bearer " 부분을 제거하고 토큰만 반환
        }
        return null;
    }
}
