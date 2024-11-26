package com.project.controller;

import com.project.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *  컨트롤러 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 컨트롤러 파일을 생성했다면 지우시면 됩니다.
 *  기능 관련 코드는 최대한 service 객체에 작성하는 게 좋습니다.
 *
 *  경로: 카멜 표기법 ("/loginForm" 등)
 */

@RestController  // React로 프론트단 구현 시 RestController (RESTful 방식)을 사용해야 합니다.
@RequiredArgsConstructor  // Autowired 사용 x
public class TestController {
    private final TestService testService;

    @GetMapping("/loginForm")  // 경로는 카멜 표기법을 사용합니다.
    public ResponseEntity<String> loginForm() {
        testService.hashCode();
        return ResponseEntity.ok("로그인 성공");
    }
}
