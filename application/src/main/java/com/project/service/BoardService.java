package com.project.service;

import com.project.domain.Board;
import com.project.domain.Users;
import com.project.dto.BoardDTO;
import com.project.repository.BoardRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;


    // 게시글 목록 조회: 닉네임 포함
    public List<BoardDTO> getAllBoardsWithNickname() {
        return boardRepository.findAllWithUserNickname();
    }

    // 게시글 상세 조회: 닉네임 포함
    public BoardDTO getBoardDetailWithNickname(Long boardId) {
        return boardRepository.findBoardDetailWithUserById(boardId);
    }

    // 게시글 생성: 엔티티 → DTO 변환 후 반환
    public BoardDTO createBoard(BoardDTO boardDTO) {
        Users user = userRepository.findById(boardDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자 ID입니다."));

        Board board = new Board();
        board.setBoardTitle(boardDTO.getBoardTitle());
        board.setBoardContent(boardDTO.getBoardContent());
        board.setUser(user);

        Board savedBoard = boardRepository.save(board);

        return new BoardDTO(
                savedBoard.getId(),
                savedBoard.getUser().getId(),
                savedBoard.getBoardTitle(),
                savedBoard.getBoardContent(),
                savedBoard.getBoardImage(),
                savedBoard.getCreatedAt(),
                savedBoard.getUser().getNickname()
        );
    }


    // 검색기능
    public List<BoardDTO> searchBoards(String keyword, String condition) {
        List<Board> results = switch (condition) {
            case "title" -> boardRepository.findByBoardTitleContaining(keyword);
            case "content" -> boardRepository.findByBoardContentContaining(keyword);
            default -> throw new IllegalArgumentException("잘못된 검색 조건입니다.");
        };
        // Board → BoardDTO 변환
        return results.stream()
                .map(board -> new BoardDTO(
                        board.getId(),
                        board.getUser().getId(),
                        board.getBoardTitle(),
                        board.getBoardContent(),
                        board.getBoardImage(),
                        board.getCreatedAt(),
                        board.getUser().getNickname()
                ))
                .toList();
    }

    // 글수정
    public BoardDTO updateBoard(BoardDTO boardDTO) {
        // 기존 게시글 조회
        Board existingBoard = boardRepository.findById(boardDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + boardDTO.getId()));

        // 필드 업데이트
        existingBoard.setBoardTitle(boardDTO.getBoardTitle());
        existingBoard.setBoardContent(boardDTO.getBoardContent());

        // 저장 후 DTO로 변환
        Board savedBoard = boardRepository.save(existingBoard);
        return new BoardDTO(
                savedBoard.getId(),
                savedBoard.getUser().getId(),
                savedBoard.getBoardTitle(),
                savedBoard.getBoardContent(),
                savedBoard.getBoardImage(),
                savedBoard.getCreatedAt(),
                savedBoard.getUser().getNickname() // 닉네임 포함
        );
    }



    // 글삭제
    public void deleteBoard(Long boardId) {
        // 게시글 존재 여부 확인
        Board existingBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + boardId));

        boardRepository.delete(existingBoard); // 게시글 삭제
    }

}
