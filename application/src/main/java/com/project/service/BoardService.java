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
}
