package com.project.repository;

import com.project.domain.Board;
import com.project.dto.BoardDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByboardTitleContaining(String keyword);
    List<Board> findByboardContentContaining(String keyword);

    // 게시글 목록 조회: 닉네임 포함
    @Query("SELECT new com.project.dto.BoardDTO(b.id, u.id, b.boardTitle, b.boardContent, b.boardImage, b.createdAt, u.nickname) " +
            "FROM Board b JOIN b.user u")
    List<BoardDTO> findAllWithUserNickname();

    // 게시글 상세 조회: 닉네임 포함
    @Query("SELECT new com.project.dto.BoardDTO(b.id, u.id, b.boardTitle, b.boardContent, b.boardImage, b.createdAt, u.nickname) " +
            "FROM Board b JOIN b.user u " +
            "WHERE b.id = :boardId")
    BoardDTO findBoardDetailWithUserById(@Param("boardId") Long id);


    List<Board> findByBoardTitleContaining(String boardTitle);

    List<Board> findByBoardContentContaining(String boardContent);
}


