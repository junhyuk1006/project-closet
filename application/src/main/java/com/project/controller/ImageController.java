package com.project.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource; // Resource 인터페이스
import org.springframework.http.MediaType; // HTTP 응답의 Content-Type 설정
import org.springframework.http.ResponseEntity; // HTTP 응답 객체
import org.springframework.web.bind.annotation.GetMapping; // GET 요청 처리
import org.springframework.web.bind.annotation.PathVariable; // URL 경로 변수 매핑
import org.springframework.web.bind.annotation.RequestMapping; // 요청 매핑
import org.springframework.web.bind.annotation.RestController; // REST 컨트롤러 애너테이션

import java.io.File; // 파일 클래스
import java.io.IOException; // IOException 처리

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private static final String IMAGE_DIR = "C:/closetImage/coordi"; // 변경된 경로

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        // 외부 디렉토리에서 파일 가져오기
        File file = new File(IMAGE_DIR + "/" + filename);

        if (file.exists()) {
            Resource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // MIME 타입 설정 (필요에 따라 PNG 등으로 변경 가능)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // 파일이 없을 경우 404 반환
        }
    }
}
