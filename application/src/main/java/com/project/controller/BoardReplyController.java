package com.project.controller;

import com.project.domain.BoardReply;
import com.project.dto.BoardReplyDTO;
import com.project.service.BoardReplyService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<BoardReplyDTO> createReply(@RequestBody BoardReplyDTO replyDTO) {
        BoardReplyDTO createdReply = replyService.createReply(replyDTO);
        return ResponseEntity.ok(createdReply);
    }

    // 댓글 조회
    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<BoardReplyDTO>> getReplies(@PathVariable Long boardId) {
        return ResponseEntity.ok(replyService.getRepliesByBoardId(boardId));
    }

    // 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<BoardReplyDTO> updateReply(@PathVariable Long id, @RequestBody BoardReplyDTO replyDTO) {
        BoardReplyDTO updatedReply = replyService.updateReply(id, replyDTO);
        return ResponseEntity.ok(updatedReply);
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

