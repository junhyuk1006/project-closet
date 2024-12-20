package com.project.controller;

import com.project.domain.Address;
import com.project.domain.Users;
import com.project.domain.detail.ItemInquiry;
import com.project.dto.*;
import com.project.repository.AddressRepository;
import com.project.service.MypageService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
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
    private final AddressRepository addressRepository;

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
    public ResponseEntity<ResponseDTO<Void>> changeBodyInfoById(
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
    public ResponseEntity<ResponseDTO<Void>> changeAddInfoById(@AuthenticationPrincipal CustomUserDetail userDetails,
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

    // 마이페이지 - 나의 리뷰 조회
    @GetMapping("/getMyReviews")
    public ResponseEntity<ResponseDTO<Page<UserItemReviewDTO>>> getMyReviews(@AuthenticationPrincipal CustomUserDetail customUserDetail,
                                                                             @RequestParam(defaultValue = "0") int page,
                                                                             @RequestParam(defaultValue = "5") int size) {


        Long userId = customUserDetail.getId();
        Pageable pageable = PageRequest.of(page, size);

        Page<UserItemReviewDTO> dtoPage = mypageService.getMyReviews(userId, pageable);

        ResponseDTO<Page<UserItemReviewDTO>> response = ResponseDTO.<Page<UserItemReviewDTO>>builder()
                .status("success")
                .data(dtoPage)
                .build();

        return ResponseEntity.ok(response);
    }

    // 마이페이지 - 프로필 조회
    @GetMapping("/getProfileImage")
    public ResponseEntity<Resource> getProfileImage(@AuthenticationPrincipal CustomUserDetail user) {
        String fileName = user.getProfileImage();

        if (fileName == null || fileName.isEmpty()) {
            fileName = "basic-image.png"; // 기본 이미지 파일 이름
        }

        try {
            // 서비스에서 파일 경로 가져오기
            Path imagePath = mypageService.getProfileImagePath(fileName);

            // 이미지 파일을 리소스로 변환
            Resource imageResource = new UrlResource(imagePath.toUri());

            if (!imageResource.exists() || !imageResource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            // MIME 타입 감지 및 기본값 설정
            String mimeType;
            try {
                mimeType = Files.probeContentType(imagePath);
                if (mimeType == null) {
                    mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // 기본 MIME 타입
                }
            } catch (IOException e) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // 예외 발생 시 기본 MIME 타입
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .contentType(MediaType.parseMediaType(mimeType)) // 감지된 MIME 타입 설정
                    .body(imageResource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // 프로필 이미지 업로드
    @PostMapping("/uploadProfileImage")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal CustomUserDetail customUserDetail) {

        Long userId = customUserDetail.getId(); // 인증된 사용자 ID 가져오기

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어 있습니다.");
        }

        try {
            // 파일 저장 및 이름 반환
            String newFileName = mypageService.saveProfileImage(file, userId);

            // 사용자 프로필 이미지 이름 업데이트
            mypageService.updateProfileImage(userId, newFileName);

            return ResponseEntity.ok(newFileName); // 새 파일 이름 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
        }
    }

    // 배송지 입력
    @PostMapping("/addAddress")
    public ResponseEntity<ResponseDTO<?>> addAddress(@RequestBody Address address, @AuthenticationPrincipal CustomUserDetail customUserDetail) {
        Long userId = customUserDetail.getId();
        try {
            // 주소 등록 서비스 호출
            mypageService.updateAddressByUserId(userId, address);

            // 성공 응답 반환
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .status("success")
                    .message("주소가 성공적으로 등록되었습니다!")
                    .data("주소가 등록되었습니다")
                    .build();
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // 논리적 에러 (예: 최대 주소 제한 초과)
            ResponseDTO<String> errorResponse = ResponseDTO.<String>builder()
                    .status("error")
                    .message(e.getMessage())
                    .build();
            return ResponseEntity.ok(errorResponse); // HTTP 200으로 에러 반환
        } catch (Exception e) {
            // 시스템 에러
            ResponseDTO<String> errorResponse = ResponseDTO.<String>builder()
                    .status("error")
                    .message("주소 등록 중 문제가 발생했습니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


}




