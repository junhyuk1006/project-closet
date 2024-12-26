package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminReviewDTO {
    private Long id;
    private String email;
    private String nickname;
    private String reviewImage;
    private String itemName;
    private String reviewContent;
    private int score;
    private Timestamp createdAt;
    private String status;
}
