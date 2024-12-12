package com.project.controller;

import com.project.domain.Board;
import com.project.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 게시글 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.getAllBoards();
        return ResponseEntity.ok(boards);
    }

    // 게시글 생성
    @PostMapping("/write")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board createdBoard = boardService.createBoard(board);
        return ResponseEntity.ok(createdBoard);
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardDetail(@PathVariable Long id) {
        Board board = boardService.getBoardDetail(id);
        return ResponseEntity.ok(board);
    }

    // 검색 API
    @GetMapping("/search")
    public ResponseEntity<List<Board>> searchBoards(
            @RequestParam String keyword,
            @RequestParam String condition) {
        List<Board> result = boardService.searchBoards(keyword, condition);
        return ResponseEntity.ok(result);
    }

}
