package com.project.controller;

import com.project.dto.ReservationDTO;
import com.project.service.StylingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StylingController {

    private final StylingService stylingService;

    @PostMapping("/book/coordi")
    public ResponseEntity<Map<String, String>> reserveStyling(@RequestBody ReservationDTO reservationDTO) {
        log.info("reserveStyling {}", reservationDTO);
        
        // save 쿼리 실행 후 결과 저장
        String result = stylingService.insertReservation(reservationDTO);

        // 응답 상태를 저장할 Map 객체 생성
        Map<String, String> response = new HashMap<>();
        
        // 결과에 따른 응답 상태 전송
        if (result.equals("success")) {
            response.put("status", "success");
            response.put("message", "예약이 성공적으로 완료되었습니다.");
            return ResponseEntity.status(200).body(response);
        } else {
            response.put("status", "fail");
            response.put("message", result);
            return ResponseEntity.status(500).body(response);
        }
    }
}
