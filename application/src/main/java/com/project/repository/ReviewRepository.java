package com.project.repository;

import com.project.domain.ItemReview;
import com.project.dto.UserItemReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ItemReview, Long> {

    @Query("SELECT new com.project.dto.UserItemReviewDTO(" +
            "u.id, u.username, u.nickname, u.profileImage, " +
            "ir.id, ir.score, ir.review_image, ir.review_content, ir.created_at) " +
            "FROM ItemReview ir " +
            "JOIN ir.Users u " +
            "WHERE ir.item_id = :itemId")
    List<UserItemReviewDTO> findUserItemReviewDTOByItemId(@Param("itemId") Long itemId);
}
