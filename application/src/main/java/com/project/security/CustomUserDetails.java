package com.project.security;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Timestamp;
import java.util.Collection;

@Getter
@Builder
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String email;
    private String naverId;
    private String kakaoId;
    private String birth;
    private String profileImage;
    private String name;
    private String phone;
    private Integer age;
    private String introduction;
    private String style;
    private String status;
    private Integer height;
    private Integer weight;
    private String size;
    private Boolean isReleased;
    private Timestamp createdAt;
    private Timestamp inactiveDate;
    private Timestamp reactiveDate;
    private Timestamp deletedAt;
    private String role;

    // UserDetails 인터페이스 구현 메서드
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // Role 기능 사용할 때 추가하기
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
