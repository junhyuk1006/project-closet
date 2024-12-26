package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminOrderDTO {
    private Long id;
    private int orderNumber;
    private String email;
    private String itemMainImage;
    private String itemName;
    private int itemCount;
    private int itemPrice;
    private int pointUsedAmount;
    private int finalPaymentAmount;
    private Timestamp paymentDate;
}
