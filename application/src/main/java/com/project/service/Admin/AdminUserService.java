package com.project.service.Admin;

import com.project.domain.User;
import com.project.dto.AdminUserDTO;
import com.project.repository.admin.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;

    public List<User> getAllUsers() {
        return adminUserRepository.findAll();
    }

    public List<AdminUserDTO> getAllUsersAdmin() {
        return adminUserRepository.findAllAdminUsers();
    }
}
