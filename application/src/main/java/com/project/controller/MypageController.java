package com.project.controller;

import com.project.domain.Address;
import com.project.dto.ResponseDTO;
import com.project.dto.UserDTO;
import com.project.service.MypageService;
import com.project.dto.CustomUserDetail;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private final MypageService mypageService;
    private final UserService userService;

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

    // 비밀번호 변경
    @PutMapping("/changePwd")
    public ResponseEntity<ResponseDTO<Void>> updatePasswordById(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal CustomUserDetail userDetails) {

        String newPwd = userDTO.getPassword(); // UserDTO에서 비밀번호 추출
        Long userId = userDetails.getId();

        // 비밀번호 변경 로직 수행
        userService.changePwd(userId, newPwd);

        // 응답 반환
        ResponseDTO<Void> response = ResponseDTO.<Void>builder()
                .status("success")
                .message("비밀번호가 성공적으로 변경되었습니다.")
                .data(null) // 변경된 비밀번호와 같은 데이터는 응답으로 줄 필요 없으므로 null
                .build();

        return ResponseEntity.ok(response);
    }

    
    // 신체 정보 수정
    @PutMapping("/changeBodyInfo")
    public  ResponseEntity<ResponseDTO<Void>>  changeBodyInfoById(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal CustomUserDetail userDetails
    ) {
        Long userId = userDetails.getId();
        userService.changeBodyInfo(userId, userDTO);


        // 응답 반환
        ResponseDTO<Void> response = ResponseDTO.<Void>builder()
                .status("success")
                .message("신체 정보가 저장되었습니다.")
                .data(null) // 변경된 비밀번호와 같은 데이터는 응답으로 줄 필요 없으므로 null
                .build();


        return ResponseEntity.ok(response);
    }

    @PutMapping("/changeAddInfo")
    public  ResponseEntity<ResponseDTO<Void>>  changeAddInfoById(@AuthenticationPrincipal CustomUserDetail userDetails,
                                                                @RequestBody UserDTO userDTO) {
        long userId = userDetails.getId();
        userService.changeAddInfo(userId, userDTO);

        // 응답 반환
        ResponseDTO<Void> response = ResponseDTO.<Void>builder()
                .status("success")
                .message("추가 정보가 저장되었습니다.")
                .data(null)
                .build();

        return ResponseEntity.ok(response);

    }





}
