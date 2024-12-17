package com.project.controller;

import com.project.service.NaverPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final NaverPayService naverPayService;

    @PostMapping("/approve")
    public ResponseEntity<Map<String, Object>> approvePayment(@RequestBody Map<String, String> payload) {
        String merchantPayKey = payload.get("merchantPayKey");

        boolean isApproved = naverPayService.approvePayment(merchantPayKey);

        Map<String, Object> response = new HashMap<>();
        if (isApproved) {
            response.put("success", true);
            response.put("message", "결제가 성공적으로 승인되었습니다.");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "결제 승인에 실패했습니다.");
            return ResponseEntity.status(400).body(response);
        }
    }
}