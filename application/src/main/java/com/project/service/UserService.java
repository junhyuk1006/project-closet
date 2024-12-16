package com.project.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.project.domain.Users;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
    // 마이페이지 - 비밀번호 변경
    @Transactional
    public void changePwd(Long userId, String newPwd) {
        // 비밀번호 암호화
        String encodedPwd = passwordEncoder.encode(newPwd);
        log.info("암호화된 비밀번호: {}, 사용자 ID: {}", encodedPwd, userId);

        // 저장소에 업데이트
        userRepository.changePwd(userId, encodedPwd);
    }

    // 신체 정보 변경
    @Transactional
    public void changeBodyInfo(Long userId, int newHeight, int newWeight, String newSize,boolean newIsReleased) {
        userRepository.changeBodyInfo(userId,newHeight,newWeight,newSize,newIsReleased);
    }

    @Transactional
    public void changeAddInfo(Long userId, String profileImage, String name, String phone, String style, String introduction) {
        userRepository.changeAddInfo(userId, profileImage, name,phone,style,introduction);
    }
}