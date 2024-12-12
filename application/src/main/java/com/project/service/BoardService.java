package com.project.service;

import com.project.domain.Board;
import com.project.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    // 게시글 목록 조회
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    // 게시글 생성
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    // 게시글 상세 조회
    public Board getBoardDetail(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + id));
    }

    // 검색기능
    public List<Board> searchBoards(String keyword, String condition) {
        return switch (condition) {
            case "title" -> boardRepository.findByboardTitleContaining(keyword);
            case "content" -> boardRepository.findByboardContentContaining(keyword);
            default -> throw new IllegalArgumentException("잘못된 검색 조건입니다.");
        };
    }

}
