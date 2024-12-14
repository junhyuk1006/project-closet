package com.project.controller;

import com.project.domain.CoordiBoard;
import com.project.service.CoordiBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coordi")
public class CoordiBoardController {

    private final CoordiBoardService coordiBoardService;

    // 1. 코디업로드
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

    // 2. 코디 게시글 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<CoordiBoard>> getCoordiList() {
        List<CoordiBoard> coordiBoards = coordiBoardService.getAllCoordis();
        return ResponseEntity.ok(coordiBoards);
    }

    // 3. 특정 게시글 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getCoordiById(@PathVariable Long id) {
        CoordiBoard coordiBoard = coordiBoardService.getCoordiById(id);
        if (coordiBoard != null) {
            return ResponseEntity.ok(coordiBoard);
        } else {
            return ResponseEntity.status(404).body("CoordiBoard not found");
        }
    }

    // 4. 코디 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoordi(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("title") String title
    ) {
        try {
            coordiBoardService.updateCoordi(id, image, description, title);
            return ResponseEntity.ok("CoordiBoard updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("CoordiBoard not found");
        }
    }

    // 5. 코디 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoordi(@PathVariable Long id) {
        boolean isDeleted = coordiBoardService.deleteCoordi(id);
        if (isDeleted) {
            return ResponseEntity.ok("CoordiBoard deleted successfully");
        } else {
            return ResponseEntity.status(404).body("CoordiBoard not found");
        }
    }
}
