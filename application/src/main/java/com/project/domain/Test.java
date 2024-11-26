package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;

/**
 *  도메인 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 도메인 파일을 생성했다면 지우시면 됩니다.
 *
 *  객체명: 테이블명과 통일 (Member, Test, ...)
 */

@Entity
@Data
public class Test {
    @Id  // 기본 키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 자동 증가
    private int id;

    @Column(nullable = false) // nullable=false는 NOT NULL 제약 조건
    private String name;

    @Column(unique = true) // unique=true는 UNIQUE 제약 조건
    private String email;
}
