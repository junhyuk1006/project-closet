package com.project.service;

import com.project.domain.BoardReply;
import com.project.repository.BoardReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardReplyService {
    private final BoardReplyRepository replyRepository;

    // 댓글 작성
    public BoardReply createReply(BoardReply reply) {
        return replyRepository.save(reply);
    }

    // 게시판 ID로 댓글 조회
    public List<BoardReply> getRepliesByBoardId(Long boardId) {
        return replyRepository.findByBoardId(boardId);
    }

    // 댓글 수정
    public BoardReply updateReply(Long id, String content) {
        BoardReply reply = replyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));
        reply.setReplyContent(content);
        return replyRepository.save(reply);
    }

    // 댓글 삭제
    public void deleteReply(Long id) {
        replyRepository.deleteById(id);
    }
}

