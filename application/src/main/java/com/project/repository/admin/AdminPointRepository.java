package com.project.repository.admin;

import com.project.domain.Point;
import com.project.dto.AdminPointDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminPointRepository extends JpaRepository<Point,Long> {
    @Query("SELECT new com.project.dto.AdminPointDTO( " +
            "p.id,u.email,u.nickname,p.pointReason,p.pointType,p.createdAt,p.deletedAt,p.point,p.status) " +
            "FROM Point p " +
            "JOIN p.user u "+
            "WHERE ((:searchKeyword IS NULL OR :searchInput = '') OR " +
            "(:searchKeyword ='nickname' AND u.nickname LIKE CONCAT('%',:searchInput,'%')) OR " +
            "(:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')))"+
            "AND (:startDate IS NULL OR p.createdAt >= :startDate)" +
            "AND (:endDate IS NULL OR p.createdAt <= :endDate)")
    Page<AdminPointDTO> findAllPointUser(Pageable pageable,
                                         @Param("searchKeyword")String searchKeyword,
                                         @Param("searchInput")String searchInput,
                                         @Param("startDate")Timestamp startDate,
                                         @Param("endDate")Timestamp endDate);
}
