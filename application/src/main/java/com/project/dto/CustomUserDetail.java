package com.project.dto;

import com.project.domain.Users;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public  class CustomUserDetail implements UserDetails {
    private final Users user;

    public CustomUserDetail(Users user) {
        this.user = user;
    }

    public Long getId() {
        return user.getId();
    }

    public String getNickname() {
        return user.getNickname();
    }

    public String getEmail() {
        return user.getEmail();
    }

    public String getNaverId() {
        return user.getNaverId();
    }

    public String getKakaoId() {
        return user.getKakaoId();
    }

    public String getBirth() {
        return user.getBirth();
    }

    public String getProfileImage() {
        return user.getProfileImage();
    }

    public String getName() {
        return user.getName();
    }

    public String getPhone() {
        return user.getPhone();
    }

    public String getIntroduction() {
        return user.getIntroduction();
    }

    public String getStyle() {
        return user.getStyle();
    }

    public String getStatus() {
        return user.getStatus();
    }

    public Integer getHeight() {
        return user.getHeight();
    }

    public Integer getWeight() {
        return user.getWeight();
    }

    public String getSize() {
        return user.getSize();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

}