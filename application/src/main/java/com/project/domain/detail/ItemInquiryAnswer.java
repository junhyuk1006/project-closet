package com.project.domain.detail;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "item_inquiry_answer")
public class ItemInquiryAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answer;

    @CreationTimestamp
    private Timestamp createdAt;

    @OneToOne
    @JoinColumn(name="item_inquiry_id", referencedColumnName = "id")
    private ItemInquiry itemInquiry;
}
