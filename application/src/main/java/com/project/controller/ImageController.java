package com.project.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource; // Resource 인터페이스
import org.springframework.http.MediaType; // HTTP 응답의 Content-Type 설정
import org.springframework.http.ResponseEntity; // HTTP 응답 객체
import org.springframework.web.bind.annotation.GetMapping; // GET 요청 처리
import org.springframework.web.bind.annotation.PathVariable; // URL 경로 변수 매핑
import org.springframework.web.bind.annotation.RequestMapping; // 요청 매핑
import org.springframework.web.bind.annotation.RestController; // REST 컨트롤러 애너테이션

import java.io.IOException; // IOException 처리

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        // src/main/resources/static/images 경로에서 파일 가져오기
        Resource resource = new ClassPathResource("static/images/" + filename);

        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // MIME 타입: JPEG (필요에 따라 수정)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // 파일이 없을 경우 404 반환
        }
    }
}