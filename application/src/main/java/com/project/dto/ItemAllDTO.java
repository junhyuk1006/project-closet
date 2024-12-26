package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemAllDTO {
    private Long id;
    private String itemName;
    private String itemCategory;
    private int itemPrice;
    private String mainImage;
    private String detailImage;
    private int views;
    private String status;
}
