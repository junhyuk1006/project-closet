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
    private String reviewImage;
    private String reviewContent;
    private String status;
    private LocalDateTime createdAt;

    //Item field
    private String itemName;


    //생성자
    public UserItemReviewDTO(Long userId, String username, String nickname, String profileImage, Long reviewId, int score, String review_image, String review_content, String status, LocalDateTime created_at) {
        UserId = userId;
        this.username = username;
        this.nickname = nickname;
        this.profileImage = profileImage;
        ReviewId = reviewId;
        this.score = score;
        this.review_image = review_image;
        this.review_content = review_content;
        this.status = status;
        this.createdAt = created_at;
    }

}
