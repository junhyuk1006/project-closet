package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminExchangeDTO {
    private Long id;
    private String email;
    private Timestamp orderDate;
    private Timestamp requestedDate;
    private int orderNumber;
    private String exchangeImage;
    private String itemName;
    private String description;
}
