package com.project.controller.admin;

import com.project.domain.User;
import com.project.service.Admin.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @GetMapping
    public List<User> getUsers() {
        return adminUserService.getAllUsers();
    }
}
