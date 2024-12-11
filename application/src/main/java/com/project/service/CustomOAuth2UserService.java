package com.project.service;

import com.project.domain.Users;
import com.project.dto.CustomOAuth2User;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest){

        // 기본 Spring OAuth2UserService를 통해 사용자 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Client 정보 추출
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Users user = null;

        // 공통적으로 처리할 사용자 정보 추출 메서드
        String email = null;
        String nickname = null;
        String providerId = null;
        String username = null;
        String name = null;
        String mobile = null;
        String fullBirthDate = null;

        if("naver".equals(registrationId)) {
            // 네이버의 경우 'response' 키 아래에 실제 사용자 정보가 있음
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");

            providerId = (String) response.get("id");
            email = (String) response.get("email");
            name = (String) response.get("name");
            nickname = (String) response.get("nickname");
            mobile = (String) response.get("mobile");

            String birthday = (String) response.get("birthday"); // MM-DD 형식
            String birthyear = (String) response.get("birthyear"); // 연도
            if (birthyear != null && birthday != null) {
                fullBirthDate = birthyear + "-" + birthday; // YYYY-MM-DD 형식
            } else if (birthday != null) {
                fullBirthDate = birthday; // MM-DD 형식만 제공된 경우
            }

            username = "naver_" + providerId;

        } else if ("kakao".equals(registrationId)) {
            providerId = String.valueOf(attributes.get("id"));
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

            email = kakaoAccount != null ? (String) kakaoAccount.get("email") : null;
            nickname = properties != null ? (String) properties.get("nickname") : null;
            name = nickname; // 카카오는 닉네임을 이름으로 대체
            username = "kakao_" + providerId;
        }

            // 데이터베이스에서 해당 소셜 ID로 사용자 찾기
            if ("naver".equals(registrationId)){
                user = userRepository.findByNaverId(providerId);
            } else if ("kakao".equals(registrationId)) {
                user = userRepository.findByKakaoId(providerId);
            }

        // 닉네임 기본값 설정 (null 또는 빈 문자열 처리)
        if (nickname == null || nickname.trim().isEmpty()) {
            nickname = "user_" + UUID.randomUUID().toString().substring(0, 8);
        }

        // 데이터베이스에서 해당 닉네임 중복 확인
        if (userRepository.findByNickname(nickname) != null) {
            nickname = "user_" + UUID.randomUUID().toString().substring(0, 8);
        }

            if (user == null){
                // 새로운 사용자 등록
                user = Users.builder()
                        .email(email)
                        .username(username)
                        .nickname(nickname)
                        .name(name)
                        .phone(mobile)
                        .birth(fullBirthDate)
                        .role("USER") // 기본 역할
                        .build();

                if ("naver".equals(registrationId)) {
                    user.setNaverId(providerId); // 네이버 ID 설정
                } else if ("kakao".equals(registrationId)) {
                    user.setKakaoId(providerId); // 카카오 ID 설정
                }

                userRepository.save(user);
            }

        return new CustomOAuth2User(user, attributes);
    }
}