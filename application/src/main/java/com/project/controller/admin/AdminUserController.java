package com.project.controller.admin;

import com.project.domain.Grade;
import com.project.domain.Users;
import com.project.dto.AdminPointDTO;
import com.project.dto.AdminUserDTO;
import com.project.dto.AdminUserMonthDTO;
import com.project.dto.PageRequestDTO;
import com.project.service.Admin.AdminUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @GetMapping("all")
    public List<Users> getAllUsers() {
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
        // 등급 수정 시 order_history 테이블의 point_earned_amount 컬럼과
        // point_used_amount 컬럼값에 null값을 가지고 있는 행들이 존재하였음.
        // OrderHistory 엔티티의 자료형이 int이기 때문에 null 값을 담을 수 없어 오류가 남
        // Grade를 업데이트 하였는데 OrderHistory 쪽에서 오류가 나는 이유는 아직 발견하지 못함.
        // order_history 테이블의 null 값들을 모두 0으로 수정 후 해결
        return adminUserService.updateGrades(grades);
    }

    @GetMapping("point")
    public Page<AdminPointDTO> getUserPoint(@PageableDefault(size = 20,sort = "createdAt",direction = Sort.Direction.DESC)Pageable pageable,
                                            @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminUserService.getUserPoint(pageable,pageRequestDTO);
    }

    @GetMapping("month")
    public List<AdminUserMonthDTO> getUserMonth() {
        return adminUserService.getUserMonth();
    }

    @GetMapping("userDate")
    public int getUserDate(@RequestParam(required = false) Timestamp startDate
    , @RequestParam(required = false) Timestamp endDate) {
        return adminUserService.getUserDate(startDate, endDate);
    }
}
