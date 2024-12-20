package com.project.repository.admin;

import com.project.domain.Notice;
import com.project.dto.AdminNoticeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminNoticeRepository extends JpaRepository<Notice,Long> {
    @Query("SELECT new com.project.dto.AdminNoticeDTO(" +
            "n.id,n.subject,n.content,n.createdAt,n.status) " +
            "FROM Notice n " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput ='') OR " +
            " (:searchKeyword ='title' AND n.subject LIKE CONCAT('%',:searchInput,'%')) OR" +
            " (:searchKeyword ='content' AND n.content LIKE CONCAT('%',:searchInput,'%'))) " +
            "AND (:startDate IS NULL OR n.createdAt >= :startDate)"+
            "AND (:endDate IS NULL OR n.createdAt <= :endDate)")

    Page<AdminNoticeDTO> findNotice(Pageable pageable,
                                    @Param("searchKeyword")String searchKeyword,
                                    @Param("searchInput")String searchInput,
                                    @Param("startDate") Timestamp startDate,
                                    @Param("endDate")Timestamp endDate);
}
