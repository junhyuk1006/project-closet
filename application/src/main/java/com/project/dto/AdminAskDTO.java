package com.project.dto;

import com.project.domain.detail.ItemInquiry;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminAskDTO {
    private Long id;
    private String email;
    private String nickname;
    private ItemInquiry.InquiryType inquiryType;
    private String itemName;
    private String content;
    private ItemInquiry.AnswerStatus answerStatus;
    private Timestamp createdAt;
}
