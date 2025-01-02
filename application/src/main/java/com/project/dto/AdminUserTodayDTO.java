package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminUserTodayDTO {
    private int todayUser;
    private int totalUser;
}
