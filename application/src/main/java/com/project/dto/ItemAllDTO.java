package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemAllDTO {
    private Long id;
    private String item_name;
    private String item_category;
    private int item_price;
    private String main_image;
    private String detail_image;
    private int views;
    private String status;
}
