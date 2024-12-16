package com.project.controller;

import com.project.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    // 인증 코드 전송
    @PostMapping("/sendCode")
    public ResponseEntity<Map<String, String>> sendCode(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", "false", "message", "이메일이 누락되었습니다."));
        }

        String verificationCode = emailService.generateVerificationCode();
        emailService.sendEmail(email, "이메일 인증 코드", emailService.generateEmailContent(verificationCode));

        session.setAttribute("verificationCode", verificationCode);
        session.setAttribute("email", email);
        session.setAttribute("expiryTime", LocalDateTime.now().plusMinutes(10)); // 코드 만료 시간 설정

        // 명시적으로 JSON 응답 반환
        return ResponseEntity.ok(Map.of("success", "true", "message", "이메일 전송에 성공했습니다."));
    }


    // 인증 코드 검증
    @PostMapping("/verifyCode")
    public ResponseEntity<Map<String, String>> verifyCode(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        String code = request.get("code");

        String savedCode = (String) session.getAttribute("verificationCode");
        String savedEmail = (String) session.getAttribute("email");
        LocalDateTime expiryTime = (LocalDateTime) session.getAttribute("expiryTime");

        if (savedCode == null || savedEmail == null || expiryTime == null) {
            return ResponseEntity.badRequest().body(Map.of("success", "false", "message", "인증 코드가 만료되었거나 존재하지 않습니다."));
        }

        if (LocalDateTime.now().isAfter(expiryTime)) {
            session.invalidate();
            return ResponseEntity.badRequest().body(Map.of("success", "false", "message", "인증 코드가 만료되었습니다."));
        }

        if (savedEmail.trim().equalsIgnoreCase(email.trim()) && savedCode.trim().equals(code.trim())) {
            session.invalidate();
            return ResponseEntity.ok(Map.of("success", "true", "message", "인증에 성공했습니다."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", "false", "message", "인증 코드가 올바르지 않습니다."));
        }
    }

}
