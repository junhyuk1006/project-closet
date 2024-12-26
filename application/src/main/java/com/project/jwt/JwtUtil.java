package com.project.jwt;

import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class JwtUtil {

  @Value("${jwt.secret-key}")
  private String secretKey;

  @Value("${jwt.expiration-time}")
  private long expirationTime;

  private Key getSigningKey() {
    return Keys.hmacShaKeyFor(secretKey.getBytes());
}

  // JWT 토큰 생성
  public String generateToken(String username) {
    return Jwts.builder()
            .setSubject(username)  //토큰 제목 (사용자 정보)
            .setIssuedAt(new Date()) // 토큰 발급 시간
            .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // 만료 시간
            .signWith(getSigningKey(), SignatureAlgorithm.ES256) // 서명 알고리즘과 키 설정
            .compact();
  }

  // 토큰에서 사용자 이름 추출
  public  String extractUsername(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJwt(token)
            .getBody()
            .getSubject();
  }

  // 토큰 유효성 검증
  public boolean validateToken(String token) {
    try{
      Jwts.parserBuilder()
              .setSigningKey(getSigningKey())
              .build()
              .parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      System.out.println("Invalid JWT Token: " + e.getMessage());
      return false;
    }
  }
}
