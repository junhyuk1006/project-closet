package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminOrderDateDTO {
    private Long orderCount;
    private Long totalPrice;
}
