package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AdminItemDTO {
    private Long id;
    private String mainImage;
    private String itemName;
    private String itemCategory;
    private int itemPrice;
    private String status;
    private Timestamp createdAt;
}
