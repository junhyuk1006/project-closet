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
    public ResponseEntity<String> savePoint(@RequestBody PointDTO point) {
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

    @RequestMapping(value = "/getTotalPointByUserid", method = {RequestMethod.GET, RequestMethod.POST})
    public int getTotalPointByUserId(@AuthenticationPrincipal CustomUserDetail customUserDetail,
                                     @RequestBody(required = false) Map<String, Long> body) {

        Long userId = customUserDetail.getId();
        try {
            // 1. userId가 @RequestParam으로 전달된 경우
            if (userId != null) {
                return pointService.getTotalPointByUserId(userId);
            }

            // 2. body에 "userId"가 포함된 경우
            if (body != null && body.containsKey("userId")) {
                Long extractedUserId = body.get("userId");
                if (extractedUserId == null) {
                    throw new IllegalArgumentException("Invalid request: userId in body is null");
                }
                return pointService.getTotalPointByUserId(extractedUserId);
            }

            // 3. 요청 데이터가 모두 없는 경우
            throw new IllegalArgumentException("Invalid request: userId is missing in both request parameters and body");
        } catch (IllegalArgumentException e) {
            // 요청 유효성 문제에 대한 예외 처리
            throw new IllegalArgumentException("Error processing request: " + e.getMessage(), e);
        } catch (Exception e) {
            // 기타 예외 처리
            throw new RuntimeException("An unexpected error occurred while processing the request", e);
        }
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        log.error("Exception occurred: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
    }

}
