package com.project.controller;

import com.project.domain.Address;
import com.project.service.MypageService;
import com.project.dto.CustomUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
    public void switchRepresentativeAddress(@PathVariable("id") long addressId,
                                            @AuthenticationPrincipal CustomUserDetail userDetail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = userDetail.getId(); // 인증된 사용자의 userId 가져오기
        log.info("userDetail: {}", userId);
        mypageService.switchRepresentativeAddress(addressId, userId);
    }





}
