package com.project.controller;

import com.project.domain.BoardReply;
import com.project.service.BoardReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/replies")
@RequiredArgsConstructor
public class BoardReplyController {
    private final BoardReplyService replyService;

    // 댓글 작성
    @PostMapping
    public ResponseEntity<BoardReply> createReply(@RequestBody BoardReply reply) {
        return ResponseEntity.ok(replyService.createReply(reply));
    }

    // 댓글 조회
    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<BoardReply>> getReplies(@PathVariable Long boardId) {
        return ResponseEntity.ok(replyService.getRepliesByBoardId(boardId));
    }

    // 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<BoardReply> updateReply(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(replyService.updateReply(id, request.get("replyContent")));
    }

    // 댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteReply(@PathVariable Long id) {
        replyService.deleteReply(id); // 댓글 삭제 로직 실행
        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 성공적으로 삭제되었습니다.");
        return ResponseEntity.ok(response); // JSON 형식 반환
    }

}

