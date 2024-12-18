package com.project.repository;

import com.project.domain.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    /**
     * 주문 번호가 특정 연도로 시작하는 주문 내역 개수 조회
     * @param year 시작 연도 (예: 2024)
     * @return 해당 연도로 시작하는 주문 번호 개수
     */
    @Query("SELECT COUNT(o) FROM OrderHistory o WHERE CAST(o.orderNumber AS string) LIKE CONCAT(:year, '%')")
    Long countByOrderNumberStartsWith(int year);

}