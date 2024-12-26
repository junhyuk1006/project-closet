package com.project.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BasketItemDTO {

    // Basket
    private Long basketId;
    private boolean isRecommendation = false;
    private int itemCount;
    private String size;
    private String color;
    private String status = "active";

    // User
    private Long userId;

    // ItemDetail
    private Long itemDetailId;
    private int itemPrice;
    private String itemName;
    private String itemCategory;
    private String mainImage;
}
