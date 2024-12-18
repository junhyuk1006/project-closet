package com.project.controller;

import com.project.dto.CoordiBoardDTO;
import com.project.dto.LikeDTO;
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

    // 코디업로드
    @PostMapping("/upload")
    public ResponseEntity<?> uploadCoordi(
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestParam("title") String title
    ) {
        try {
            CoordiBoardDTO coordiBoardDTO = coordiBoardService.saveCoordi(image, description, userId, title);
            return ResponseEntity.ok(coordiBoardDTO);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // 코디 게시글 전체 조회 (DTO)
    @GetMapping("/list")
    public ResponseEntity<List<CoordiBoardDTO>> getCoordiList() {
        List<CoordiBoardDTO> coordiBoards = coordiBoardService.getAllCoordis();
        return ResponseEntity.ok(coordiBoards);
    }

    // 코디 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoordi(@PathVariable Long id) {
        boolean isDeleted = coordiBoardService.deleteCoordi(id);
        if (isDeleted) {
            return ResponseEntity.ok("CoordiBoard deleted successfully");
        } else {
            return ResponseEntity.status(404).body("CoordiBoard not found");
        }
    }

    // 좋아요 토글
    @PostMapping("/like")
    public ResponseEntity<LikeDTO> toggleLike(@RequestBody LikeDTO dto) {
        LikeDTO response = coordiBoardService.toggleLike(dto);
        return ResponseEntity.ok(response);
    }

    // 좋아요 상태 조회
    @GetMapping("/like/status")
    public ResponseEntity<LikeDTO> getLikeStatus(
            @RequestParam Long coordiBoardId, @RequestParam Long userId) {
        LikeDTO response = coordiBoardService.getLikeStatus(coordiBoardId, userId);
        return ResponseEntity.ok(response);
    }

/*    // 특정 게시글 조회 (DTO)
    @GetMapping("/{id}")
    public ResponseEntity<?> getCoordiById(@PathVariable Long id) {
        CoordiBoardDTO coordiBoardDTO = coordiBoardService.getCoordiById(id);
        if (coordiBoardDTO != null) {
            return ResponseEntity.ok(coordiBoardDTO);
        } else {
            return ResponseEntity.status(404).body("CoordiBoard not found");
        }
    }

    // 코디 게시글 수정 (DTO)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoordi(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("title") String title
    ) {
        try {
            CoordiBoardDTO updatedCoordiBoardDTO = coordiBoardService.updateCoordi(id, image, description, title);
            return ResponseEntity.ok(updatedCoordiBoardDTO);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }*/
}
