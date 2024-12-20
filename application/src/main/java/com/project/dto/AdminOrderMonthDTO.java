package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminOrderMonthDTO {
    private int year;
    private int month;
    private Long totalPrice;
}
