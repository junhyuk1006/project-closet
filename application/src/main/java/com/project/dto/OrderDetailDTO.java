package com.project.dto;

import lombok.Data;

@Data
public class OrderDetailDTO {
    private Long id;
    private int itemPrice;
    private int itemCount;
    private String itemName;
    private String color; // 추가된 필드
    private String size; // 추가된 필드
    private String itemMainImage; // 추가된 필드
}