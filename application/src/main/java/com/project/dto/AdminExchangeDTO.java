package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminExchangeDTO {
    private Long id;
    private Timestamp orderDate;
    private Timestamp requestedDate;
    private int orderNo;
    private String exchangeImage;
    private String itemName;
    private String exchangeDescription;
}
