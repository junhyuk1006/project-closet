package com.project.repository.admin;

import com.project.domain.RefundItem;
import com.project.dto.AdminRefundDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminRefundRepository extends JpaRepository<RefundItem, Long> {
    @Query("SELECT new com.project.dto.AdminRefundDTO(" +
            "r.id, oh.paymentDate,r.requestedAt,oh.orderNumber,r.refundImage,od.itemName,r.description)" +
            "FROM RefundItem r " +
            "LEFT JOIN r.orderHistory oh " +
            "LEFT JOIN oh.orderDetails od " +
            "LEFT JOIN oh.user u " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput = '') OR " +
            "(:searchKeyword ='orderNo' AND CONCAT('', oh.orderNumber) LIKE CONCAT('%',:searchInput,'%')) OR " +
            "(:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')) OR " +
            "(:searchKeyword ='itemName' AND od.itemName LIKE CONCAT('%',:searchInput,'%')))"+
            "AND (:startDate IS NULL OR oh.paymentDate >= :startDate)" +
            "AND (:endDate IS NULL OR oh.paymentDate <= :endDate)")
    Page<AdminRefundDTO> findRefund(Pageable pageable,
                                    @Param("searchKeyword")String searchKeyword,
                                    @Param("searchInput")String searchInput,
                                    @Param("startDate") Timestamp startDate,
                                    @Param("endDate")Timestamp endDate);
}
