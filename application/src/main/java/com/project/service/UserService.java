package com.project.service;

import com.project.security.TokenProvider;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.project.domain.Users;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSenderImpl mailSender;
    private final TokenProvider tokenProvider;

    public Users create(final Users user) {
        // 요청 데이터 검증
        if (user == null || user.getUsername() == null) {
            throw new RuntimeException("Invalid arguments");
        }

        // 사용자 이름 중복 확인
        final String username = user.getUsername();
        if (userRepository.existsByUsername(username)) {
            log.warn("username already exists {}", username);
            throw new RuntimeException("username already exists"); // 경고 로그
        }

        // 사용자 저장
        return userRepository.save(user);
    }

    public Users getByCredentials(final String username, final String password,
                                  final PasswordEncoder encoder) {

        final Users originalUser = userRepository.findByUsername(username);

        // matches 메소드를 이용해 패스워드가 같은지 확인
        if(originalUser != null && encoder.matches(password, originalUser.getPassword())) {
            return originalUser;
        }
        return null;
    }

    // 아이디 중복 여부 확인
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    // 닉네임 중복 여부 확인
    public boolean isNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    // 이메일 중복 여부 확인
    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email); // 중복 여부 반환
    }

    // 마이페이지 - 비밀번호 변경
    @Transactional
    public void changePwd(Long userId, String newPwd) {
        // 비밀번호 암호화
        String encodedPwd = passwordEncoder.encode(newPwd);
        log.info("암호화된 비밀번호: {}, 사용자 ID: {}", encodedPwd, userId);

        // 저장소에 업데이트
        userRepository.changePwd(userId, encodedPwd);
    }

    // 마이페이지 - 신체 정보 변경
    public void changeBodyInfo(Long userId, UserDTO userDTO) {

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // DTO에서 엔티티 필드 업데이트
        user.setHeight(userDTO.getHeight());
        user.setWeight(userDTO.getWeight());
        user.setSize(userDTO.getSize());
        user.setIsReleased(userDTO.getIsReleased());

        // 저장
        userRepository.save(user);
    }

    // 마이페이지 - 추가 정보 변경
    public void changeAddInfo(Long userId, UserDTO userDTO) {

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // DTO에서 엔티티 필드 업데이트
        user.setName(userDTO.getName());
        user.setPhone(userDTO.getPhone());
        user.setSize(userDTO.getSize());
        user.setIntroduction(userDTO.getIntroduction());

        // 저장
        userRepository.save(user);
    }

    // 아이디 찾기
    public String findUsernameByEmail(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 이메일로 등록된 계정을 찾을 수 없습니다."));
        return user.getUsername();
    }

    // 비밀번호 재설정 링크 전송
    public void sendPasswordResetLink(String email, String username) {
        Users user = userRepository.findByUsernameAndEmail(username, email)
                .orElseThrow(() -> new RuntimeException("입력하신 정보와 일치하는 계정이 없습니다."));

        /// 비밀번호 재설정용 토큰 생성
        String token = tokenProvider.createPasswordResetToken(user);

        // 실제 비밀번호 재설정 페이지의 호스트/도메인에 맞춰 URL을 구성
        String resetLink = "http://localhost:3000/change-password?token=" + token;

        // 이메일 전송
        sendEmail(
                email,
                "비밀번호 재설정 요청",
                "안녕하세요. 아래 링크를 클릭하여 비밀번호를 재설정해 주세요.\n\n" + resetLink
        );
    }

    // 이메일 전송 메서드
    private void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, false);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("이메일 전송 중 오류가 발생했습니다.");
        }
    }

}