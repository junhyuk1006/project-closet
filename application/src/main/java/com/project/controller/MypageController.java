package com.project.controller;

import com.project.domain.Address;
import com.project.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private final MypageService mypageService;

    // 회원의 모든 등록 배송지 조회
    @GetMapping("/getAddress")
    public List<Address> findByUserId(@RequestParam("userId") long userId) {
        return mypageService.findByUserId(userId);  // Address 테이블의 모든 데이터 조회
    }





}
