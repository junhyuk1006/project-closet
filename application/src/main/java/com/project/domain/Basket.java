package com.project.domain;

import com.project.domain.detail.ItemDetail;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "basket")
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 사용자와 매핑
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY) // 상품 상세와 매핑
    @JoinColumn(name = "item_detail_id", referencedColumnName = "id", nullable = false)
    private ItemDetail itemDetail;

    private int itemCount;
    private String color;
    private String size;
    private String status= "active";

    private boolean isRecommendation = false;
}
