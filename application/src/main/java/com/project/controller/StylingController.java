package com.project.controller;

import com.project.domain.Reservation;
import com.project.service.StylingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StylingController {

    private final StylingService stylingService;

    @PostMapping("/book/coordi")
    public ResponseEntity<Map<String, String>> bookStyling(@RequestBody Reservation reservation) {
        log.info("bookStyling {}", reservation);

        // 프론트에서 예외를 처리하기 위한 응답 상태 전송
        Map<String, String> response = new HashMap<>();
        if (stylingService.bookStyling(reservation).equals("success")) {
            response.put("status", "success");
            response.put("message", "예약이 성공적으로 완료되었습니다.");
            return ResponseEntity.status(200).body(response);
        } else {
            response.put("status", "fail");
            response.put("message", "예약에 실패했습니다.");
            return ResponseEntity.status(500).body(response);
        }
    }
}
