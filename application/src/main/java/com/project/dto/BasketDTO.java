package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BasketDTO {

    private Long basketId;
    private Long itemDetailId;
    private Long userId;

    private boolean isRecommendation;

    private int itemCount;
    private String size;
    private String color;
    private String status = "active";

}
