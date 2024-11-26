package com.project.controller;

import com.project.domain.Test;
import com.project.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *  컨트롤러 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 컨트롤러 파일을 생성했다면 지우시면 됩니다.
 *  기능 관련 코드는 최대한 service 객체에 작성하는 게 좋습니다.
 *
 *  경로: 카멜 표기법 ("/loginForm" 등)
 */

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor // 생성자를 통해 의존성을 주입받도록 설정
public class TestController {

    private final TestService testService; // final 키워드 추가

    /*
    Backend JS 환경에서 Ajax 는  Post, Get 설정도 하고, Controller 에도 PostMapping, GetMapping 을 추가하여 연결했음
    React 환경에서는 Js, Jsx 에서는 Post, Get 설정은 하지 않고 Controller 어노테이션 만으로 기능 구현이 가능
    */

    @GetMapping
    public List<Test> getAllTests() {
        return testService.getAllTests(); // DB 데이터 불러오는 함수
    }
}