package com.project.repository;

import com.project.domain.BoardReply;
import com.project.dto.BoardReplyDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardReplyRepository extends JpaRepository<BoardReply, Long> {
    List<BoardReply> findByBoardId(Long id); // 특정 게시글의 댓글 조회
    List<BoardReply> findByParentId(int parentId); // 대댓글 조회

    @Query("SELECT new com.project.dto.BoardReplyDTO(r.id, r.boardId, r.replyContent, u.id, u.nickname) " +
            "FROM BoardReply r JOIN r.user u " +
            "WHERE r.boardId = :boardId")
    List<BoardReplyDTO> findReplyDTOByBoardId(@Param("boardId") Long boardId);
}