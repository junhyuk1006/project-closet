package com.project.domain.detail;

import com.project.domain.Users;
import jakarta.persistence.*;
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

    @Column(name = "item_id") // DB 컬럼과 매핑
    private Long itemId;

    private int score;
    private String review_image;
    private String review_content;
    private String status = "active";

    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users users;

}
