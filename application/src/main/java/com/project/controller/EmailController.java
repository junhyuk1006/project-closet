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
    public ResponseEntity<String> sendCode(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("이메일이 누락되었습니다.");
        }

        String verificationCode = emailService.generateVerificationCode();
        emailService.sendEmail(email, "이메일 인증 코드", emailService.generateEmailContent(verificationCode));

        session.setAttribute("verificationCode", verificationCode);
        session.setAttribute("email", email);
        session.setAttribute("expiryTime", LocalDateTime.now().plusMinutes(10)); // 코드 만료 시간 설정

        return ResponseEntity.ok("이메일 전송에 성공했습니다.");
    }

    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        String code = request.get("code");

        // 세션에서 가져온 데이터
        String savedCode = (String) session.getAttribute("verificationCode");
        String savedEmail = (String) session.getAttribute("email");
        LocalDateTime expiryTime = (LocalDateTime) session.getAttribute("expiryTime");

        // 디버깅 로그 추가
        System.out.println("클라이언트에서 전달받은 email: " + email);
        System.out.println("클라이언트에서 전달받은 code: " + code);
        System.out.println("세션에 저장된 email: " + savedEmail);
        System.out.println("세션에 저장된 code: " + savedCode);
        System.out.println("세션 만료 시간: " + expiryTime);
        System.out.println("현재 시간: " + LocalDateTime.now());

        // 세션 데이터 확인
        if (savedCode == null || savedEmail == null || expiryTime == null) {
            return ResponseEntity.badRequest().body("인증 코드가 만료되었거나 존재하지 않습니다.");
        }

        // 인증 코드 만료 확인
        if (LocalDateTime.now().isAfter(expiryTime)) {
            session.invalidate();
            return ResponseEntity.badRequest().body("인증 코드가 만료되었습니다.");
        }

        // 인증 코드와 이메일 확인
        if (savedEmail.trim().equalsIgnoreCase(email.trim()) && savedCode.trim().equals(code.trim())) {
            session.invalidate();
            return ResponseEntity.ok("인증에 성공했습니다.");
        } else {
            return ResponseEntity.badRequest().body("인증 코드가 올바르지 않습니다.");
        }
    }

}
