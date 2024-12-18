package com.project.controller;

import com.project.domain.Point;
import com.project.dto.CustomUserDetail;
import com.project.dto.PointDTO;
import com.project.service.PointService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;
    private final UserService userService;

    /** 리뷰 포인트 저장*/
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/saveReviewPoint")
    public ResponseEntity<String> savePoint(@RequestBody Point point) {
        pointService.save(point);
        return ResponseEntity.ok("success");
    }



    @GetMapping("/getPointByUserid")
    public ResponseEntity<Page<PointDTO>> getPointByUserid(
            @AuthenticationPrincipal CustomUserDetail userDetail,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        long userId = userDetail.getId();
        Pageable pageable = PageRequest.of(page, size); // 페이지 번호와 크기 설정
        Page<PointDTO> points = pointService.findPointDTOsByUserId(userId, pageable);
        return ResponseEntity.ok(points);
    }

    @GetMapping("/getTotalPointByUserid")
    public ResponseEntity<PointDTO> getTotalPointByUserid(@AuthenticationPrincipal CustomUserDetail userDetail) {
        long userId = userDetail.getId();
        PointDTO dto = pointService.getTotalPointByUserId(userId);
        return ResponseEntity.ok(dto);
    }


}
