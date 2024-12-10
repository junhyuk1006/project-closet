package com.project.service;

import com.project.domain.Users;
import com.project.dto.CustomOAuth2User;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest){
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        Users user = null;

        if("naver".equals(registrationId)){
            // 네이버의 경우 'response' 키 아래에 실제 사용자 정보가 있음
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");
            String email = (String) response.get("email");
            String name = (String) response.get("name");
            String naverId = (String) response.get("Id");
            String nickname = (String) response.get("nickname");

            // 데이터베이스에서 네이버 ID로 사용자 찾기
            user = userRepository.findByNaverId(naverId);
            if (user == null){
                // 새로운 사용자 등록
                user = Users.builder()
                        .email(email)
                        .name(name)
                        .naverId(naverId)
                        .build();
                userRepository.save(user);
            }
        }

        return new CustomOAuth2User(user, attributes);
    }
}
