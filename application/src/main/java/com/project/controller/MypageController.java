package com.project.controller;

import com.project.domain.Address;
import com.project.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    
    // 회원 주소 삭제
    @DeleteMapping("/deleteAddress/{id}")
    public void deleteByUserId(@PathVariable("id") long id) {
        mypageService.deleteById(id);
    }

    // 대표 주소 변경
    @PutMapping("/switchRepresentativeAddress/{id}")
    public void switchRepresentativeAddress(@PathVariable("id") long id,
                                                                     @RequestParam("userId") long userId) {
        mypageService.switchRepresentativeAddress(id,userId);
    }




}
