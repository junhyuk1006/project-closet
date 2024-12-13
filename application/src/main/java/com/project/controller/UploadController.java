package com.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UploadController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description) {

        String filePath = null;
        String fileName = null;

        if (image != null && !image.isEmpty()) {
            // static/images 경로 설정
            String staticImagePath = new File("src/main/resources/static/images").getAbsolutePath();
            fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            filePath = staticImagePath + "/" + fileName;

            File file = new File(filePath);

            try {
                // 파일 저장
                image.transferTo(file);

                // 로그 출력
                System.out.println("Uploaded Description: " + description);
                System.out.println("Saved File: " + filePath);

                return ResponseEntity.ok("File uploaded successfully: " + fileName);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("File upload failed");
            }
        }

        return ResponseEntity.badRequest().body("No file uploaded");
    }
}
