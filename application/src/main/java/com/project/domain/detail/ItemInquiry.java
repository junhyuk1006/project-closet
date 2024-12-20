package com.project.domain.detail;

import com.project.domain.Users;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "item_inquiry")
public class ItemInquiry {

    public enum AnswerStatus {
        Pending, Answered, Closed
    }

    public enum Status {
        active, inactive
    }

    public enum InquiryType {
        ProductInquiry, ExchangeInquiry, ReturnInquiry, OtherInquiry
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_detail_id", referencedColumnName = "id")
    private ItemDetail itemDetail;

    private String content;

    @Enumerated(EnumType.STRING) // ENUM 값을 문자열로 저장
    @Column(name = "inquiry_type", nullable = false)
    private InquiryType inquiryType;

    @Enumerated(EnumType.STRING) // ENUM 값을 문자열로 저장
    @Column(name = "answer_status", nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.Pending;

    @Enumerated(EnumType.STRING) // 관리 상태 ENUM
    @Column(name = "status", nullable = false)
    private Status status = Status.active;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users users;
}
