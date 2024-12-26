package com.project.repository.admin;

import com.project.domain.detail.ItemReview;
import com.project.dto.AdminReviewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminReviewRepository extends JpaRepository<ItemReview,Long> {

    @Query("SELECT new com.project.dto.AdminReviewDTO(" +
            "ir.id,u.email,u.nickname,ir.reviewImage,id.itemName,ir.reviewContent,ir.score,ir.createdAt,ir.status)" +
            "FROM ItemReview ir " +
            "LEFT JOIN ir.itemDetail id " +
            "JOIN ir.users u " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput = '') OR " +
            "(:searchKeyword ='nickname' AND u.nickname LIKE CONCAT('%',:searchInput,'%')) OR " +
            "(:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')))"+
            "AND (:startDate IS NULL OR ir.createdAt >= :startDate)" +
            "AND (:endDate IS NULL OR ir.createdAt <= :endDate)")
    Page<AdminReviewDTO> findReview(Pageable pageable,
                                    @Param("searchKeyword")String searchKeyword,
                                    @Param("searchInput")String searchInput,
                                    @Param("startDate") Timestamp startDate,
                                    @Param("endDate")Timestamp endDate);
}
