package com.project.controller;

import com.project.domain.Board;
import com.project.dto.BoardDTO;
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
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoardsWithNickname();
        return ResponseEntity.ok(boards);
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardDetail(@PathVariable Long id) {
        BoardDTO boardDetail = boardService.getBoardDetailWithNickname(id);
        return ResponseEntity.ok(boardDetail);
    }

    // 게시글 생성
    @PostMapping("/write")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board createdBoard = boardService.createBoard(board);
        return ResponseEntity.ok(createdBoard);
    }

    // 검색 API
    @GetMapping("/search")
    public ResponseEntity<List<Board>> searchBoards(
            @RequestParam String keyword,
            @RequestParam String condition) {
        List<Board> result = boardService.searchBoards(keyword, condition);
        return ResponseEntity.ok(result);
    }

    // 글수정
    @PutMapping("/update/{id}")
    public ResponseEntity<Board> updateBoard(
            @PathVariable Long id,
            @RequestBody Board updatedBoard) {
        Board board = boardService.updateBoard(id, updatedBoard);
        return ResponseEntity.ok(board);
    }

    // 글삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.ok("삭제 성공");
    }



}
