package com.project.repository;

import com.project.dto.UserItemInquiryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.project.domain.detail.ItemInquiry;
import org.springframework.data.domain.Pageable;


import java.util.List;

@Repository
public interface ItemInquiryRepository extends JpaRepository<ItemInquiry, Long> {

    @Query("SELECT new com.project.dto.UserItemInquiryDTO(" +
            "u.id, u.username, u.nickname, u.profileImage, " +
            "ir.id, ir.content, ir.inquiryType, ir.answerStatus, ir.status, ir.createdAt, " +
            "a.id, a.answer, a.createdAt" +
            ") " +
            "FROM ItemInquiry ir " +
            "JOIN ir.users u " +
            "LEFT JOIN ItemInquiryAnswer a ON a.itemInquiry = ir " +
            "WHERE ir.itemDetail.id = :itemDetailId")
    List<UserItemInquiryDTO> findByUserId(@Param("itemDetailId") Long itemDetailId);

    @Query("SELECT count(i) from ItemInquiry i where i.itemDetail.id = :itemId ")
    Long countInquiriesByItemId(@Param("itemId") Long itemId);

    @Query(value = "SELECT new com.project.dto.UserItemInquiryDTO(" +
            "u.id, u.username, u.nickname, u.profileImage, " +
            "ir.id, ir.content, ir.inquiryType, ir.answerStatus, ir.status, ir.createdAt, " +
            "a.id, a.answer, a.createdAt" +
            ") " +
            "FROM ItemInquiry ir " +
            "JOIN ir.users u " +
            "LEFT JOIN ItemInquiryAnswer a ON a.itemInquiry = ir " +
            "WHERE u.id = :userId",
            countQuery = "SELECT COUNT(ir) " +
                    "FROM ItemInquiry ir " +
                    "JOIN ir.users u " +
                    "LEFT JOIN ItemInquiryAnswer a ON a.itemInquiry = ir " +
                    "WHERE u.id = :userId")
    Page<UserItemInquiryDTO> findByUsers_Id(@Param("userId") Long userId, Pageable pageable);

}
