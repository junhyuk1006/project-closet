package com.project.repository;

import com.project.dto.UserItemInquiryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.project.domain.detail.ItemInquiry;

import java.util.List;

@Repository
public interface ItemInquiryRepository extends JpaRepository<ItemInquiry, Long> {

    @Query("SELECT new com.project.dto.UserItemInquiryDTO(" +
            "u.id, u.username, u.nickname, u.profileImage, " +
            "ir.id, ir.content, ir.inquiryType, ir.answerStatus, ir.status, ir.createdAt) " +
            "FROM ItemInquiry ir " +
            "JOIN ir.users u " +
            "WHERE ir.itemDetailId = :itemDetailId")
    List<UserItemInquiryDTO> findByUserId(@Param("itemDetailId") Long itemDetailId);}
