package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor // 모든 필드를 포함하는 생성자를 자동으로 생성
@NoArgsConstructor  // 기본 생성자를 자동으로 생성
public class OrderDetailHistoryDeliveryDTO {

    private Long orderDetailId;
    private int itemPrice;
    private int itemCount;
    private String itemName;
    private String color;
    private String size;

    private Long orderHistoryId;
    private int orderNumber;
    private int totalPaymentAmount;
    private String paymentStatus;
    private String paymentDate;

    private Long deliveryId;
    private String deliveryNumber;
    private String deliveryStatus;


}
