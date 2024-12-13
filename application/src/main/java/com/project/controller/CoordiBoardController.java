package com.project.controller;

import com.project.service.CoordiBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coordi")
public class CoordiBoardController {

    private final CoordiBoardService coordiBoardService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadCoordi(
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestParam("title") String title
    ) {
        try {
            // 서비스 계층에 처리 위임
            coordiBoardService.saveCoordi(image, description, userId, title);
            return ResponseEntity.ok("File uploaded and data saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed");
        }
    }
}
