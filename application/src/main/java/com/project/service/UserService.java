package com.project.service;

import com.project.domain.User;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User create(final User user) {
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

    public User getByCredentials(final String username, final String password) {
        // 사용자 이름과 비밀번호로 조회
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
