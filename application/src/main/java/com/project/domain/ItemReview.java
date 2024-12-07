package com.project.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="item_review")
public class ItemReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long item_id;
    private int score;

    private String review_image;
    private String review_content;
    private String status = "active";

    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users Users;

}
