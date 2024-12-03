package com.project.controller;

import com.project.domain.Point;
import com.project.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
public class PointController {

    private PointService pointService;

    @GetMapping("/getAllPoint")
    public ResponseEntity<List<Point>> getAllPoint() {
        List<Point> points = pointService.getAllPoint(); // Point 리스트 가져오기
        return ResponseEntity.ok(points); // HTTP 200 상태와 함께 데이터 반환
    }




}
