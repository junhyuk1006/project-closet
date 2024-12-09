package com.project.service.Admin;

import com.project.domain.User;
import com.project.dto.AdminUserDTO;
import com.project.repository.admin.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;

    public List<User> getAllUsers() {
        return adminUserRepository.findAll();
    }

    public Page<AdminUserDTO> getAllUsersAdmin(Pageable pageable) {
        return adminUserRepository.findAllAdminUsers(pageable);
    }
}
