package com.project.service;

import com.project.dto.UserDTO;
import com.project.dto.UserGradeDTO;
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
    
    // 마이페이지 - 등급 적립율 조회
    public UserGradeDTO findGradeByUserId(Long userId) {
        Optional<Users> user = userRepository.findById(userId);
        if(user.isPresent()) {
            UserGradeDTO userGradeDTO = new UserGradeDTO();
            userGradeDTO.setGrade(user.get().getGrade().getGrade());
            userGradeDTO.setRate(user.get().getGrade().getRate());

            return userGradeDTO;
        }

        return null;
    }

    public void save(Users user) {
        userRepository.save(user);
    }


}