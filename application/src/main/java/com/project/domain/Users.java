package com.project.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;

import com.project.domain.ItemReview;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@Data
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 아이디

    private String username; // 계정

    private String password; // 비밀번호

    private String nickname; // 네이버 로그인 사용자는 naver_id 사용

    private String email; // 이메일

    private String naverId; // 네이버

    private String kakaoId; // 카카오

    private String birth; // 생년월일

    private String profileImage; // 프로필 사진

    private String name; // 이름

    private String phone; // 휴대폰번호

    private Integer age; // 나이

    private String introduction; // 자기소개

    private String style; // 스타일

    private String status; // 상태

    private Integer height; // 키

    private Integer weight; // 몸무게

    private String size; // 사이즈

    private Boolean isReleased; // 공개여부

    @CreationTimestamp
    private java.sql.Timestamp created_at; // 가입일자

    private java.sql.Timestamp inactiveDate; // 비활성화일자

    private java.sql.Timestamp reactiveDate; // 차단해제일자

    private java.sql.Timestamp deletedAt; // 탈퇴일자

    private String role; // 역할

}
