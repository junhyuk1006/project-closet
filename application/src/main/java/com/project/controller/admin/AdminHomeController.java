package com.project.controller.admin;

import com.project.dto.AdminUserDTO;
import com.project.dto.AdminUserTodayDTO;
import com.project.service.Admin.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/admin/home")
@RequiredArgsConstructor
public class AdminHomeController {

    private final AdminUserService adminUserService;


    @GetMapping("userToday")
    public AdminUserTodayDTO userToday(@RequestParam(required = false)Timestamp date) {
        System.out.println("date는" + date);
        return adminUserService.getUserToday(date);
    }
}
