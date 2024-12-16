package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminUserMonthDTO {
    private int year;
    private int month;
    private Long totalUser;
}


