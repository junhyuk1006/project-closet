package com.project.dto;

import com.project.domain.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final Users user;
    private final Map<String, Object> attributes;

    public CustomOAuth2User(Users user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;

    }

    public Users getUser() {
        return user;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 필요 시 권한 추가
        return Collections.emptyList();
    }

    @Override
    public String getName() {
        return user.getUsername();
    }
}
