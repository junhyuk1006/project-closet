package com.project.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.domain.Users;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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

}