package com.project.security;

import com.project.domain.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
    public String create(Users user) {

        Claims claims = Jwts.claims();
        claims.put("id", user.getId()); // 사용자 id 추가
        claims.put("username", user.getUsername()); // 사용자 username 추가

        Claims claims = Jwts.claims();
        claims.put("id", user.getId()); // 사용자 id 추가
        claims.put("username", user.getUsername()); // 사용자 username 추가

        // JWT Token 생성
        return Jwts.builder()
                .setClaims(claims) // Payload에 추가된 Claims 설정
                // Header에 들어갈 내용 및 서명을 위한 SECRET_KEY
                .setIssuer("demo app") // 발급자
                .setIssuedAt(new Date()) // 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + expiryDate)) // 만료 시간
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 서명
                .compact();
    }

        // JWT 검증 및 사용자 ID 반환 메서드
        public Map<String, Object> validateAndGetUserId (String token){
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

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", claims.get("id", Long.class));
            userInfo.put("username", claims.get("username", String.class));

            return userInfo;
        }
    }
