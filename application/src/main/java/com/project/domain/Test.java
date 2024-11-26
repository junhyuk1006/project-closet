package com.project.domain;

import lombok.Data;

/**
 *  도메인 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 도메인 파일을 생성했다면 지우시면 됩니다.
 *
 *  객체명: 테이블명과 통일 (Member, Test, ...) *  Alias: 소문자 표기법 ("member", "store", ...)
 */

@Data
@Alias("test")
public class Test {
    private int id;
    private String memberId;
}
