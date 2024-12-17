package com.project.repository.admin;

import com.project.domain.OrderHistory;
import com.project.dto.AdminOrderDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminOrderRepository extends JpaRepository<OrderHistory,Long> {
    @Query("SELECT new com.project.dto.AdminOrderDTO("+
        "od.id,oh.orderNumber,od.itemMainImage,od.itemName,od.itemCount,od.itemPrice,oh.pointUsedAmount,oh.finalPaymentAmount,oh.paymentDate) " +
        "FROM OrderDetail od "+
        "LEFT JOIN OrderHistory oh "
        )
    List<AdminOrderDTO> findOrder();
}
