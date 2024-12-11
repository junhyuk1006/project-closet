package com.project.repository;

import com.project.domain.detail.ItemReview;
import com.project.dto.UserItemReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ItemReview, Long> {

    boolean existsByUsersIdAndItemId(Long userId, Long itemId);

    @Query("SELECT new com.project.dto.UserItemReviewDTO(" +
            "u.id, u.username, u.nickname, u.profileImage, " +
            "ir.id, ir.score, ir.review_image, ir.review_content, ir.status, ir.created_at) " +
            "FROM ItemReview ir " +
            "JOIN ir.users u " +
            "WHERE ir.itemId = :itemId")
    List<UserItemReviewDTO> findUserItemReviewDTOByItemId(@Param("itemId") Long itemId);

    @Query("SELECT count(i) from ItemReview i where i.itemId = :itemId")
    Long countInquiry(@Param("itemId") Long itemId);
}
