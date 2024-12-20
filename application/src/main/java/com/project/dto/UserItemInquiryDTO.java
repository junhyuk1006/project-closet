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
}
