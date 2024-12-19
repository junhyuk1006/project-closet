package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminDeliveryDTO {
    private Long id;
    private String deliveryNumber;
    private int orderNumber;
    private String email;
    private String deliveryStatus;
    private Timestamp paymentDate;
}
