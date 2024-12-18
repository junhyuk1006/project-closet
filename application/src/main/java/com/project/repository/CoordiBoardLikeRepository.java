package com.project.repository;

import com.project.domain.CoordiBoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CoordiBoardLikeRepository extends JpaRepository<CoordiBoardLike, Long> {

    // 좋아요 여부 확인
    @Query("SELECT l FROM CoordiBoardLike l WHERE l.coordiBoardId = :coordiBoardId AND l.userId = :userId")
    Optional<CoordiBoardLike> findLikeByCoordiBoardIdAndUserId(@Param("coordiBoardId") Long coordiBoardId, @Param("userId") Long userId);

    // 좋아요 수 조회
    @Query("SELECT COUNT(l) FROM CoordiBoardLike l WHERE l.coordiBoardId = :coordiBoardId")
    Long countLikesByCoordiBoardId(@Param("coordiBoardId") Long coordiBoardId);

    // 좋아요 삭제
    @Modifying
    @Query("DELETE FROM CoordiBoardLike l WHERE l.coordiBoardId = :coordiBoardId AND l.userId = :userId")
    void deleteLikeByCoordiBoardIdAndUserId(@Param("coordiBoardId") Long coordiBoardId, @Param("userId") Long userId);
}
