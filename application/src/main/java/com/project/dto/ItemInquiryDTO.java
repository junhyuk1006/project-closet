package com.project.dto;

import com.project.domain.detail.ItemInquiry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemInquiryDTO {

    private Long id; // ID 필드는 @Id와 @GeneratedValue 제거, DTO에서는 필요 없음
    private Long userId; // 사용자 ID
    private Long itemDetailId; // 상품 세부사항 ID
    private String content; // 문의 내용
    private ItemInquiry.InquiryType inquiryType; // 문의 유형
    private ItemInquiry.AnswerStatus answerStatus; // 답변 상태
    private ItemInquiry.Status status; // 관리 상태
    private LocalDateTime createdAt; // 생성 시간

    // 엔티티 데이터를 DTO로 변환하는 생성자
    public ItemInquiryDTO(ItemInquiry itemInquiry) {
        this.id = itemInquiry.getId();
        this.userId = itemInquiry.getUsers() != null ? itemInquiry.getUsers().getId() : null; // Null 안전 처리
        this.itemDetailId = itemInquiry.getItemDetail() != null ? itemInquiry.getItemDetail().getId() : null; // Null 안전 처리
        this.content = itemInquiry.getContent();
        this.inquiryType = itemInquiry.getInquiryType();
        this.answerStatus = itemInquiry.getAnswerStatus();
        this.status = itemInquiry.getStatus();
        this.createdAt = itemInquiry.getCreatedAt();
    }
}