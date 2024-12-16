package com.project.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // 인증 코드 생성
    public String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 6자리 숫자 생성
        return String.valueOf(code);
    }

    // 이메일 전송
    public void sendEmail(String recipient, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(content, true); // HTML 형식 활성화

            // 발신자 정보 설정
            try {
                helper.setFrom("admin@closet.com", "관리자"); // 이메일과 이름 설정
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException("발신자 정보 설정 실패", e);
            }

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }
    }

    // 이메일 내용 생성
    public String generateEmailContent(String verificationCode) {
        return "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;'>" +
                "  <h2 style='color: #333;'>이메일 인증</h2>" +
                "  <p style='font-size: 16px; color: #555;'>아래의 인증 코드를 입력하여 인증을 완료해 주세요.</p>" +
                "  <div style='text-align: center; margin: 20px 0;'>" +
                "    <span style='font-size: 24px; font-weight: bold; color: #007bff;'>" + verificationCode + "</span>" +
                "  </div>" +
                "  <p style='font-size: 14px; color: #999;'>이 인증 코드는 10분간 유효합니다.</p>" +
                "  <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>" +
                "  <p style='font-size: 12px; color: #999;'>본 메일을 요청하지 않으셨다면, 이 이메일을 무시하셔도 됩니다.</p>" +
                "</div>";
    }
}
