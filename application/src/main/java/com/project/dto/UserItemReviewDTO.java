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

    public UserItemReviewDTO(Long userId, String username, String nickname, String profileImage, Long reviewId, int score, String reviewImage, String reviewContent, String status, LocalDateTime createdAt) {
        UserId = userId;
        this.username = username;
        this.nickname = nickname;
        this.profileImage = profileImage;
        ReviewId = reviewId;
        this.score = score;
        this.reviewImage = reviewImage;
        this.reviewContent = reviewContent;
        this.status = status;
        this.createdAt = createdAt;
    }

    //Review 필드
    private Long ReviewId;
    private int score;
    private String reviewImage;
    private String reviewContent;
    private String status;
    private LocalDateTime createdAt;

    //Item field
    private String itemName;


}
