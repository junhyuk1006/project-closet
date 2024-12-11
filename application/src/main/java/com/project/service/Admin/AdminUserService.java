package com.project.service.Admin;

import com.project.domain.Users;
import com.project.dto.AdminUserDTO;
import com.project.dto.PageRequestDTO;
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

    public List<Users> getAllUsers() {
        return adminUserRepository.findAll();
    }

    public Page<AdminUserDTO> getUsers(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminUserRepository.findAllAdminUsers(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate(),
                pageRequestDTO.getLevel());
    }
}
