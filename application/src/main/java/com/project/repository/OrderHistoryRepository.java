package com.project.repository;

import com.project.domain.OrderHistory;
import com.project.dto.OrderDetailHistoryDeliveryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    /**
     * 주문 번호가 특정 연도로 시작하는 주문 내역 개수 조회
     *
     * @param year 시작 연도 (예: 2024)
     * @return 해당 연도로 시작하는 주문 번호 개수
     */
    @Query("SELECT COUNT(o) FROM OrderHistory o WHERE CAST(o.orderNumber AS string) LIKE CONCAT(:year, '%')")
    Long countByOrderNumberStartsWith(int year);

    // 마이페이지 - 주문내역 가져오기
    @Query("SELECT new com.project.dto.OrderDetailHistoryDeliveryDTO(" +
            "od.id, od.itemPrice, od.itemCount, od.itemName, od.color, od.size, " +
            "oh.id, oh.orderNumber, oh.totalPaymentAmount, oh.paymentStatus, " +
            "CAST(FUNCTION('DATE_FORMAT', oh.paymentDate, '%Y-%m-%d %H:%i:%s') AS string), " +
            "d.id, d.deliveryNumber, d.deliveryStatus) " +
            "FROM OrderDetail od " +
            "JOIN od.orderHistory oh " +
            "JOIN oh.delivery d " +
            "WHERE oh.user.id = :userId")
    List<OrderDetailHistoryDeliveryDTO> findOrdersByUserId(@Param("userId") Long userId);
}