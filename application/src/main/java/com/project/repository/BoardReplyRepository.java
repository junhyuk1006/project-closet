package com.project.repository;

import com.project.domain.BoardReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardReplyRepository extends JpaRepository<BoardReply, Long> {
    List<BoardReply> findByBoardId(Long id); // 특정 게시글의 댓글 조회
    List<BoardReply> findByParentId(int parentId); // 대댓글 조회
}