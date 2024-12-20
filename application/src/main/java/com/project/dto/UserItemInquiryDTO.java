package com.project.dto;

import com.project.domain.detail.ItemInquiry;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserItemInquiryDTO {

    //Users 필드
    private Long userId;

    public UserItemInquiryDTO(Long userId, String username, String nickname, String profileImage, Long inquiryId, String inquiryContent, ItemInquiry.InquiryType inquiryType, ItemInquiry.AnswerStatus answerStatus, ItemInquiry.Status status, Timestamp createdAt, Long answerId, String answer, Timestamp answerCreateAt) {
        this.userId = userId;
        this.username = username;
        this.nickname = nickname;
        this.profileImage = profileImage;
        InquiryId = inquiryId;
        InquiryContent = inquiryContent;
        this.inquiryType = inquiryType;
        this.answerStatus = answerStatus;
        this.status = status;
        this.createdAt = createdAt;
        this.answerId = answerId;
        this.answer = answer;
        this.answerCreateAt = answerCreateAt;
    }

    private String username;
    private String nickname;
    private String profileImage;

    //Inquiry 필드
    private Long InquiryId;
    private String InquiryContent;
    private ItemInquiry.InquiryType inquiryType;
    private ItemInquiry.AnswerStatus answerStatus;
    private ItemInquiry.Status status;
    private Timestamp createdAt;

    //Inquiry_Answer 필드
    private Long answerId;
    private String answer;
    private Timestamp answerCreateAt;

    //Item _Detail
    private String itemName;
}
