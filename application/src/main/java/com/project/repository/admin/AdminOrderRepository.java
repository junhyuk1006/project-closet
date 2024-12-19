package com.project.repository.admin;

import com.project.domain.OrderDetail;
import com.project.dto.AdminDeliveryDTO;
import com.project.dto.AdminOrderDTO;
import com.project.dto.AdminOrderDateDTO;
import com.project.dto.AdminOrderMonthDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AdminOrderRepository extends JpaRepository<OrderDetail,Long> {
    @Query("SELECT new com.project.dto.AdminOrderDTO("+
        "od.id,oh.orderNumber,u.email ,od.itemMainImage,od.itemName,od.itemCount,od.itemPrice,oh.pointUsedAmount,oh.finalPaymentAmount,oh.paymentDate) " +
        "FROM OrderDetail od "+
        "JOIN od.orderHistory oh "+
        "JOIN oh.user u " +
        "WHERE ((:searchKeyword IS NULL OR :searchInput = '') OR " +
        "(:searchKeyword ='orderNo' AND CONCAT('', oh.orderNumber) LIKE CONCAT('%',:searchInput,'%')) OR " +
        "(:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')) OR " +
        "(:searchKeyword ='itemName' AND od.itemName LIKE CONCAT('%',:searchInput,'%')))"+
        "AND (:startDate IS NULL OR oh.paymentDate >= :startDate)" +
        "AND (:endDate IS NULL OR oh.paymentDate <= :endDate)")
    Page<AdminOrderDTO> findOrder(Pageable pageable,
                                  @Param("searchKeyword")String searchKeyword,
                                  @Param("searchInput")String searchInput,
                                  @Param("startDate")Timestamp startDate,
                                  @Param("endDate")Timestamp endDate);

    @Query("SELECT new com.project.dto.AdminDeliveryDTO(" +
            "oh.id,d.deliveryNumber,oh.orderNumber,u.email,d.deliveryStatus,oh.paymentDate)" +
            "FROM OrderHistory oh " +
            "LEFT JOIN oh.delivery d " +
            "JOIN oh.user u " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput = '') OR " +
            "(:searchKeyword ='orderNo' AND CONCAT('', oh.orderNumber) LIKE CONCAT('%',:searchInput,'%')) OR " +
            "(:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')) OR " +
            "(:searchKeyword ='deliveryNo' AND d.deliveryNumber LIKE CONCAT('%',:searchInput,'%')))"+
            "AND (:startDate IS NULL OR oh.paymentDate >= :startDate)" +
            "AND (:endDate IS NULL OR oh.paymentDate <= :endDate)")
    Page<AdminDeliveryDTO> findDelivery(Pageable pageable,
                                        @Param("searchKeyword")String searchKeyword,
                                        @Param("searchInput")String searchInput,
                                        @Param("startDate")Timestamp startDate,
                                        @Param("endDate")Timestamp endDate);

    @Query("SELECT new com.project.dto.AdminOrderMonthDTO(" +
            "YEAR(oh.paymentDate), MONTH (oh.paymentDate) , SUM(oh.finalPaymentAmount)) " +
            "FROM OrderHistory oh " +
            "WHERE oh.paymentDate BETWEEN :startDate AND :endDate " +
            "GROUP BY YEAR (oh.paymentDate), MONTH (oh.paymentDate)" +
            "ORDER BY YEAR (oh.paymentDate), MONTH (oh.paymentDate) ASC ")
    List<AdminOrderMonthDTO> findOrderMonth(@Param("startDate") LocalDateTime startDate , @Param("endDate")LocalDateTime endDate);

    @Query("SELECT new com.project.dto.AdminOrderDateDTO(" +
            "COUNT (oh) , SUM(oh.finalPaymentAmount))" +
            "FROM OrderHistory oh " +
            "WHERE (:startDate IS NULL OR :endDate IS NULL) OR " +
            "oh.paymentDate BETWEEN :startDate AND :endDate")
    AdminOrderDateDTO findOrderDate(@Param("startDate")Timestamp startDate , @Param("endDate")Timestamp endDate);
}
