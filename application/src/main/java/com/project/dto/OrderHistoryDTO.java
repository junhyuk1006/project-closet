package com.project.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderHistoryDTO {

    private Long id;                      // 주문 내역 ID
    private Long userId;                  // 사용자 ID
    private Long deliveryId;
    private List<OrderDetailDTO> orderDetails; // 주문 상세 목록

    private int orderNumber;              // 주문 번호
    private int pointEarnedAmount;        // 적립 포인트
    private int pointUsedAmount;          // 사용된 포인트
    private int totalPaymentAmount;       // 총 결제 금액
    private int finalPaymentAmount;       // 최종 결제 금액 (포인트 적용 후)

    private String paymentStatus;         // 결제 상태
    private String paymentMethod;         // 결제 수단
    private Timestamp paymentDate;    // 결제일
}