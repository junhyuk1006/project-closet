package com.project.controller;

import com.project.service.NaverPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final NaverPayService naverPayService;
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @PostMapping("/approve")
    public ResponseEntity<Map<String, Object>> approvePayment(@RequestBody Map<String, String> payload) {
        String merchantPayKey = payload.get("merchantPayKey");
        String paymentId = payload.get("paymentId");
        logger.info("merchantPayKey: {}, paymentId: {}", merchantPayKey, paymentId);

        boolean isApproved = naverPayService.approvePayment(merchantPayKey, paymentId);

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