package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_detail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_history_id", referencedColumnName = "id", nullable = false)
    private OrderHistory orderHistory; // 주문 내역 (N:1 관계)

    private int itemPrice;
    private int itemCount;
    private String itemName;
    private String color;
    private String size;
    private String itemMainImage;

}
