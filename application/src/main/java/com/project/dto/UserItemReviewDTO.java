package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserItemReviewDTO {

    //Users 필드
    private Long UserId;
    private String username;
    private String nickname;
    private String profileImage;

    //Review 필드
    private Long ReviewId;
    private int score;
    private String review_image;
    private String review_content;
    private String status;
    private LocalDateTime created_at;
    
}
