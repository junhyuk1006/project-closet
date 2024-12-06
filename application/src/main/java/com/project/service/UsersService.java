package com.project.service;

import com.project.domain.Users;
import com.project.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j // 로깅 객체 자동 생성 (log 변수 사용 가능)
@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;

    public Users create(final Users user) {
        // 요청 데이터 검증
        if (user == null || user.getUsername() == null) {
            throw new RuntimeException("Invalid arguments");
        }

        // 사용자 이름 중복 확인
        final String username = user.getUsername();
        if (usersRepository.existsByUsername(username)) {
            log.warn("username already exists {}", username);
            throw new RuntimeException("username already exists"); // 경고 로그
        }

        // 사용자 저장
        return usersRepository.save(user);
    }

    public Users getByCredentials(final String username, final String password,
                                  final PasswordEncoder encoder) {

        final Users originalUser = usersRepository.findByUsername(username);

        // matches 메소드를 이용해 패스워드가 같은지 확인
        if(originalUser != null && encoder.matches(password, originalUser.getPassword())) {
            return originalUser;
        }
        return null;
    }
}
