package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminRefundDTO {
    private Long id;
    private Timestamp orderDate;
    private Timestamp requestedDate;
    private int orderNo;
    private String refundImage;
    private String itemName;
    private String refundDescription;
}
