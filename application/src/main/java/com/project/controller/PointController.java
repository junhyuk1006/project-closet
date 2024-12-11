package com.project.controller;

import com.project.domain.Point;
import com.project.dto.CustomUserDetail;
import com.project.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // 전체 포인트 조회
    @GetMapping("/getAllPoint")
    public ResponseEntity<List<Point>> findAll() {
        List<Point> points = pointService.findAll();
        return ResponseEntity.ok(points);
    }

    // 개인 유저 포인트 조회
    @GetMapping("/getPointByUserid")
    public ResponseEntity<List<Point>> getPointByUserid(@AuthenticationPrincipal CustomUserDetail userDetail) {
        // 인증된 사용자 정보에서 userId 추출

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        long userId = userDetail.getId(); // 인증된 사용자의 userId 가져오기
        List<Point> points = pointService.findByUserId(userId);
        return ResponseEntity.ok(points);
    }

    // 개인 포인트 총합 조회
    @GetMapping("getTotalPointByUserid")
    public int getTotalPointByUserid(@PathVariable Long userId) {
        // 특정 유저 중 point_type = '적립' 인 것만 sum해서 계산
        return pointService.getTotalPointByUserid(userId);
    }

    // 개인 소멸 예정 포인트 총합 조회
    @GetMapping("getExpirePointByUserid")
    // 특정 유저 중  현재 날짜 기준으로 만료일이 1달 이내일 때 포인트만 계산
    public int getExpirePointByUserid(@RequestParam("userId") long userId) {
        return pointService.getExpirePointByUserid(userId);
    }

}
