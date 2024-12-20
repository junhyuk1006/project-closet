package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminItemDTO {
    private Long id;
    private String detailImage;
    private String itemCategory;
    private String ItemName;
    private int itemPrice;
    private String color;
    private String size;
    private int ItemCount;
    private String status;
    private Timestamp createdAt;
}
