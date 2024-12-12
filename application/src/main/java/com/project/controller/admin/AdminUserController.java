package com.project.controller.admin;

import com.project.domain.Grade;
import com.project.domain.User;
import com.project.dto.AdminPointDTO;
import com.project.dto.AdminUserDTO;
import com.project.dto.PageRequestDTO;
import com.project.service.Admin.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

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
        return adminUserService.getUsers(pageable, pageRequestDTO);
    }

    @GetMapping("grade")
    public List<Grade> getGrades() {
        return adminUserService.getAllGrades();
    }

    @PostMapping("grade")
    public List<Grade> updateGrade(@RequestBody List<Grade> grades) {
        return adminUserService.updateGrades(grades);
    }

    @GetMapping("point")
    public Page<AdminPointDTO> getUserPoint(@PageableDefault(size = 20,sort = "createdAt",direction = Sort.Direction.DESC)Pageable pageable,
                                            @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminUserService.getUserPoint(pageable,pageRequestDTO);
    }
}
