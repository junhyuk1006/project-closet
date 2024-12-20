package com.project.repository.admin;

import com.project.domain.detail.ItemInquiry;
import com.project.dto.AdminAskDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminAskRepository extends JpaRepository<ItemInquiry,Long> {

    @Query("SELECT new com.project.dto.AdminAskDTO(" +
            "iq.id, u.email,u.nickname,iq.inquiryType,id.itemName,iq.content,iq.answerStatus,iq.createdAt)" +
            "FROM ItemInquiry iq " +
            "JOIN iq.itemDetail id " +
            "JOIN iq.users u " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput ='') OR " +
            " (:searchKeyword ='itemName' AND id.itemName LIKE CONCAT('%',:searchInput,'%')) OR " +
            " (:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')) OR " +
            " (:searchKeyword ='nickname' AND u.nickname LIKE CONCAT('%',:searchInput,'%'))) " +
            "AND (:startDate IS NULL OR id.createdAt >= :startDate)"+
            "AND (:endDate IS NULL OR id.createdAt <= :endDate)" +
            "AND (:status ='' OR iq.answerStatus = :status )")
    Page<AdminAskDTO> findAsk(Pageable pageable,
                              @Param("searchKeyword")String searchKeyword,
                              @Param("searchInput")String searchInput,
                              @Param("startDate")Timestamp startDate,
                              @Param("endDate")Timestamp endDate,
                              @Param("status")String status);
}
