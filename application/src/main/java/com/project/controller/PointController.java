package com.project.controller;

import com.project.domain.Point;
import com.project.dto.CustomUserDetail;
import com.project.dto.PointDTO;
import com.project.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;
    /** 리뷰 포인트 저장*/
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/saveReviewPoint")
    public ResponseEntity<String> savePoint(@RequestBody Point point) {
        pointService.save(point);
        return ResponseEntity.ok("success");
    }

    // 개인 유저 포인트 내역 조회
    @GetMapping("/getPointByUserid")
    public ResponseEntity<List<PointDTO>> getPointByUserid(@AuthenticationPrincipal CustomUserDetail userDetail) {
        long userId = userDetail.getId();
        List<PointDTO> points = pointService.findPointDTOsByUserId(userId);
        return ResponseEntity.ok(points);
    }

    @GetMapping("getTotalPointByUserid")
    public ResponseEntity<Map<String, Integer>> getTotalPointByUserid(@AuthenticationPrincipal CustomUserDetail userDetail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = userDetail.getId(); // 인증된 사용자 ID 가져오기
        log.info("userDetail point: {}", userId);

        Map<String, Integer> totalPoints = pointService.getTotalPointByUserid(userId); // JSON 형태로 데이터 가져오기
        return ResponseEntity.ok(totalPoints); // 그대로 반환
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        log.error("Exception occurred: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
    }

}
