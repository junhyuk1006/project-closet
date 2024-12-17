package com.project.service;

import com.project.domain.BoardReply;
import com.project.domain.Users;
import com.project.dto.BoardReplyDTO;
import com.project.repository.BoardReplyRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardReplyService {
    private final BoardReplyRepository replyRepository;
    private final UserRepository userRepository;

    // 댓글 작성 (DTO 기반)
    public BoardReplyDTO createReply(BoardReplyDTO replyDTO) {
        Users user = userRepository.findById(replyDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자 ID입니다."));

        BoardReply reply = new BoardReply();
        reply.setBoardId(replyDTO.getBoardId());
        reply.setUser(user);
        reply.setReplyContent(replyDTO.getReplyContent());
        reply.setParentId(0); // 필요하다면 클라이언트에서 받아 설정

        BoardReply savedReply = replyRepository.save(reply);

        return new BoardReplyDTO(
                savedReply.getId(),
                savedReply.getBoardId(),
                savedReply.getReplyContent(),
                savedReply.getUser().getId(),
                savedReply.getUser().getNickname()
        );
    }

    // 댓글 조회 (DTO 반환)
    public List<BoardReplyDTO> getRepliesByBoardId(Long boardId) {
        return replyRepository.findReplyDTOByBoardId(boardId);
    }

    // 댓글 수정 (DTO 기반)
    public BoardReplyDTO updateReply(Long id, BoardReplyDTO replyDTO) {
        BoardReply reply = replyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));

        // 작성자 검증 로직이 필요하다면 여기에 추가 (ex. reply.getUser().getId() == replyDTO.getUserId() 확인)

        reply.setReplyContent(replyDTO.getReplyContent());
        BoardReply updatedReply = replyRepository.save(reply);

        return new BoardReplyDTO(
                updatedReply.getId(),
                updatedReply.getBoardId(),
                updatedReply.getReplyContent(),
                updatedReply.getUser().getId(),
                updatedReply.getUser().getNickname()
        );
    }

    // 댓글 삭제
    public void deleteReply(Long id) {
        replyRepository.deleteById(id);
    }
}

