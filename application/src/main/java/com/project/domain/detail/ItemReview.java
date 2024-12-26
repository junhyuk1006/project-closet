package com.project.domain.detail;

import com.project.domain.Users;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "item_review") // 테이블 이름
public class ItemReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_detail_id",referencedColumnName = "id") // 스네이크 케이스 컬럼 매핑
    private ItemDetail itemDetail;

    private int score;
    private String reviewImage;
    private String reviewContent;
    private String status = "active";

    @Column(name = "created_at") // 스네이크 케이스 컬럼 매핑
    @CreationTimestamp
    private Timestamp createdAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id") // 스네이크 케이스 컬럼 매핑
    private Users users;
}
