package com.project.dto;

import com.project.domain.Users;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public  class CustomUserDetails implements UserDetails {
    private final Users user;

    public  CustomUserDetails(Users user) {
        this.user = user;
    }

    public  Users getUser(){
        return user;
    }

    public String getNickname(){
        return user.getNickname();
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