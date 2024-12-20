package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminItemDetailDTO {
    private Long id;
    private String mainImage;
    private String itemName;
    private String itemCategory;
    private int itemPrice;
    private String status;
    private Timestamp createdAt;
}
