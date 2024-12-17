package com.project.service;

import com.project.domain.Board;
import com.project.dto.BoardDTO;
import com.project.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;


    // 게시글 목록 조회: 닉네임 포함
    public List<BoardDTO> getAllBoardsWithNickname() {
        return boardRepository.findAllWithUserNickname();
    }

    // 게시글 상세 조회: 닉네임 포함
    public BoardDTO getBoardDetailWithNickname(Long id) {
        return boardRepository.findBoardDetailWithUserById(id);
    }

    // 게시글 생성
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }


    // 검색기능
    public List<Board> searchBoards(String keyword, String condition) {
        return switch (condition) {
            case "title" -> boardRepository.findByboardTitleContaining(keyword);
            case "content" -> boardRepository.findByboardContentContaining(keyword);
            default -> throw new IllegalArgumentException("잘못된 검색 조건입니다.");
        };
    }

    // 글수정
    public Board updateBoard(Long id, Board updatedBoard) {
        // 기존 게시글 조회
        Board existingBoard = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + id));
        
        // 필요한 필드 업데이트
        existingBoard.setBoardTitle(updatedBoard.getBoardTitle());
        existingBoard.setBoardContent(updatedBoard.getBoardContent());
        
        return boardRepository.save(existingBoard); // 수정 후 저장
    }

    // 글삭제
    public void deleteBoard(Long id) {
        // 게시글 존재 여부 확인
        Board existingBoard = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + id));

        boardRepository.delete(existingBoard); // 게시글 삭제
    }

}
