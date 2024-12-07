package com.project.controller;


import com.project.domain.Users;
import com.project.security.TokenProvider;
import com.project.service.UserService;
import com.project.dto.ResponseDTO;
import com.project.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

    final UserService userService;

    final TokenProvider tokenProvider;

    final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){
        try{
            // 요청 데이터를 사용해 Users 엔티티 생성
            Users user = Users.builder()
                    .username(userDTO.getUsername())
                    .nickname(userDTO.getNickname())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .email(userDTO.getEmail())
                    .birth(userDTO.getBirth())
                    .build();

            // UserService를 통해 사용자 저장
            Users registerdUser = userService.create(user);

            // 응답용 DTO 생성
            UserDTO responseUserDTO = UserDTO.builder()
                    .username(registerdUser.getUsername())
                    .nickname(registerdUser.getNickname())
                    .id(registerdUser.getId())
                    .email(registerdUser.getEmail())
                    .birth(registerdUser.getBirth())
                    .build();

            // 성공 응답 반환
            return ResponseEntity.ok().body(responseUserDTO);
        } catch (Exception e) {
            // 에러 응답 반환
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO){
        // 자격 증명 확인
        Users user = userService.getByCredentials(
                userDTO.getUsername(),
                userDTO.getPassword(),passwordEncoder);

        if (user != null) {
            // 토큰 생성
            final String token = tokenProvider.create(user);
            final UserDTO responserUserDTO = UserDTO.builder()
                    .username(user.getUsername())
                    .token(token)
                    .build();
            return ResponseEntity.ok().body(responserUserDTO);
        }else {
            // 인증 실패 시 에러 메시지 반환
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error("Login failed.")
                    .build();

            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }
}
