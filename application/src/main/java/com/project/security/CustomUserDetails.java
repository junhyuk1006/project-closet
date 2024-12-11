package com.project.security;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@Builder
public class CustomUserDetails implements UserDetails {
    private Long id;               // 사용자 ID
    private String username;       // 사용자 이름 (로그인 계정)
    private String password;       // 비밀번호
    private String nickname;       // 닉네임
    private String email;          // 이메일
    private String naverId;        // 네이버 ID (연동 계정)
    private String kakaoId;        // 카카오 ID (연동 계정)
    private String birth;          // 생년월일
    private String profileImage;   // 프로필 이미지 URL
    private String name;           // 이름
    private String phone;          // 전화번호
    private Integer age;           // 나이
    private String introduction;   // 자기소개
    private String style;          // 스타일 (선호 정보)
    private String status;         // 계정 상태
    private Integer height;        // 키
    private Integer weight;        // 몸무게
    private String size;           // 사이즈
    private Boolean isReleased;    // 공개 여부
    private Timestamp createdAt;   // 생성일
    private Timestamp inactiveDate;// 비활성화 날짜
    private Timestamp reactiveDate;// 재활성화 날짜
    private Timestamp deletedAt;   // 삭제일

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();  // 추후 role추가
    }

    @Override
    public String getPassword() {
        return password; // 비밀번호 반환
    }

    @Override
    public String getUsername() {
        return username; // 사용자 이름(아이디) 반환
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정이 만료되지 않음
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정이 잠기지 않음
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 자격 증명이 만료되지 않음
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정이 활성화됨
    }
}
