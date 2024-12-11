package com.project.controller.admin;

import com.project.domain.User;
import com.project.dto.AdminUserDTO;
import com.project.dto.PageRequestDTO;
import com.project.service.Admin.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @GetMapping("all")
    public List<User> getAllUsers() {
        return adminUserService.getAllUsers();
    }

    @GetMapping("user")
    public Page<AdminUserDTO> getUsers(@PageableDefault(size = 20,sort="createdAt",direction = Sort.Direction.DESC)Pageable pageable,
                                       @ModelAttribute PageRequestDTO pageRequestDTO) {
        System.out.println(pageRequestDTO);
        Page<AdminUserDTO> users = adminUserService.getUsers(pageable, pageRequestDTO);
        System.out.println(users);
        return adminUserService.getUsers(pageable, pageRequestDTO);
    }
}
