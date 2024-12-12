package com.project.repository;

import com.project.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByboardTitleContaining(String keyword);
    List<Board> findByboardContentContaining(String keyword);
}


