package com.project.security;

import com.project.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.security.Key;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {

    @Value("${jwt.secret-key}")
    private String SECRET_KEY;

    @Value("${jwt.expiration-time}")
    private long expiryDate;

    // 대칭 키 생성
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // JWT 생성 메서드
    public String create(User user) {

        // JWT Token 생성
        return Jwts.builder()
                // Header에 들어갈 내용 및 서명을 위한 SECRET_KEY
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 서명 알고리즘과 키 설정
                // Payload에 들어갈 내용
                .setSubject(user.getUsername()) // sub (사용자 ID)
                .setIssuer("demo app") // iss (발급자)
                .setIssuedAt(new Date()) // iat (발급 시간)
                .setExpiration(new Date(System.currentTimeMillis() + expiryDate)) // exp (만료 시간)
                .compact();
    }

        // JWT 검증 및 사용자 ID 반환 메서드
        public String validateAndGetUserId (String token){
            // Signing key 생성
            Key key = getSigningKey();

            // parserClaimJws 메서드 Base64로 디코딩 및 파싱
            // 헤더와 페이로드를 setSingingKey로 넘어온 시크릿을 이용해 서명한 후 token의 서명과 비교
            // 위조되지 않았다다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
            // 그중 우리는 userId가 필요하므로 getBody를 부른다.
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        }
    }
