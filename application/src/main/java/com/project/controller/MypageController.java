package com.project.controller;

import com.project.domain.Address;
import com.project.domain.Users;
import com.project.domain.detail.ItemInquiry;
import com.project.dto.*;
import com.project.service.MypageService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

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

    // 등급, 적립율 조회
    @GetMapping("/findGradeByUser")
    public ResponseEntity<ResponseDTO<UserGradeDTO>> findGradeByUserId(
            @AuthenticationPrincipal CustomUserDetail customUserDetail) {

        Long userId = customUserDetail.getId();

        // 서비스에서 UserGradeDTO 반환
        UserGradeDTO userGradeDTO = userService.findGradeByUserId(userId);

        // ResponseDTO 생성
        ResponseDTO<UserGradeDTO> response = ResponseDTO.<UserGradeDTO>builder()
                .status("success")
                .data(userGradeDTO) // UserGradeDTO 객체를 data에 설정
                .build();

        return ResponseEntity.ok(response); // ResponseEntity로 반환
    }

    // 마이페이지 - 내 문의내역 조회
    @GetMapping("/getInquiriesByUser")
    public ResponseEntity<ResponseDTO<Page<UserItemInquiryDTO>>> getInquiriesByUser(
            @AuthenticationPrincipal CustomUserDetail customUserDetail,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Long userId = customUserDetail.getId();
        Pageable pageable = PageRequest.of(page, size);

        Page<UserItemInquiryDTO> dtoPage = mypageService.getInquiriesByUser(userId, pageable);

        ResponseDTO<Page<UserItemInquiryDTO>> response = ResponseDTO.<Page<UserItemInquiryDTO>>builder()
                .status("success")
                .data(dtoPage)
                .build();

        return ResponseEntity.ok(response);
    }
    
    // 마이페이지 - 프로필명만 업로드(추후 수정예정)
    @PostMapping("/uploadProfile/{fileName}")
    public ResponseEntity<ResponseDTO<UserDTO>> uploadProfileImage(
            @AuthenticationPrincipal CustomUserDetail customUserDetail,
            @PathVariable("fileName") String fileName) {

        Long userId = customUserDetail.getId();



            try {

                // 서비스로 사용자 ID와 파일명 전달
                UserDTO userDTO = userService.updateProfileImage(userId, fileName);

                // 성공 응답 반환
                return ResponseEntity.ok(ResponseDTO.<UserDTO>builder()
                        .status("success")
                        .data(userDTO)
                        .message("프로필 이미지가 업데이트되었습니다.")
                        .build());

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ResponseDTO.<UserDTO>builder()
                                .status("error")
                                .message("프로필 이미지 업데이트에 실패했습니다.")
                                .build());
            }
        }


        // 마이페이지 - 나의 리뷰 조회
        @GetMapping("/getMyReviews")
        public ResponseEntity<ResponseDTO<Page<UserItemReviewDTO>>> getMyReviews(@AuthenticationPrincipal CustomUserDetail customUserDetail,
                                                                           @RequestParam(defaultValue = "0") int page,
                                                                           @RequestParam(defaultValue = "5") int size) {


            Long userId = customUserDetail.getId();
            Pageable pageable = PageRequest.of(page, size);

            Page<UserItemReviewDTO> dtoPage =    mypageService.getMyReviews(userId,pageable);

            ResponseDTO<Page<UserItemReviewDTO>> response = ResponseDTO.<Page<UserItemReviewDTO>>builder()
                    .status("success")
                    .data(dtoPage)
                    .build();

            return ResponseEntity.ok(response);
        }
    }




