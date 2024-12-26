package com.project.dto;

import com.project.domain.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderHistoryWithDetailsDTO {
    private Long orderHistoryId;
    private int orderNumber;
    private int totalPaymentAmount;
    private String paymentStatus;
    private String paymentDate;

    private Long deliveryId;
    private String deliveryNumber;
    private String deliveryStatus;

    private List<OrderDetail> orderDetails; // 주문 상세 리스트
}
