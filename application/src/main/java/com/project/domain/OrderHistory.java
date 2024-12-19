package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "order_history")
@Data
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int orderNumber; // 주문번호
    private int pointEarnedAmount; // 적립금
    private int pointUsedAmount; // 사용적립금
    private int totalPaymentAmount; // 총결제금
    private int finalPaymentAmount; // 최종결제금
    private String paymentMethod; // 결제방법
    private String paymentStatus; // 결제상태
    @CreationTimestamp
    private Timestamp paymentDate; // 결제일

    @ManyToOne(fetch = FetchType.LAZY) // (fetch = FetchType.LAZY) -> 성능
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false) // 기존 외래 키와 참조 키
    private Users user; // Users 테이블의 ID와 매핑

    @OneToOne
    @JoinColumn(name = "delivery_id",referencedColumnName = "id", nullable = false)
    private Delivery delivery;


}
