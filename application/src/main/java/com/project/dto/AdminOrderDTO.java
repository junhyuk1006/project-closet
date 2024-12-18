package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminOrderDTO {
    private Long id;
    private int orderNumber;
    private String itemMainImage;
    private String itemName;
    private int itemCount;
    private int itemPrice;
    private int pointUsedAmount;
    private int finalPaymentAmount;

    @CreationTimestamp
    private Timestamp paymentDate;
}
