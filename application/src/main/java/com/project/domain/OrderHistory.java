package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "order_history")
public class OrderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // (fetch = FetchType.LAZY) -> 성능
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false) // 기존 외래 키와 참조 키
    private Users user; // Users 테이블의 ID와 매핑

    private Long deliveryId;

    @OneToMany(mappedBy = "orderHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails; // OrderDetail과 양방향 관계 설정

    @Column(unique = true, nullable = false)
    private int orderNumber; // 주문 번호 (유니크)

    private int pointEarnedAmount; // 적립 포인트
    private int pointUsedAmount; // 사용된 포인트
    private int totalPaymentAmount; // 총 결제 금액
    private int finalPaymentAmount; // 최종 결제 금액 (포인트 적용 후)

    private String paymentStatus; // 결제 상태
    private String paymentMethod; // 결제 수단

    @CreationTimestamp
    private LocalDateTime paymentDate; // 결제일
}
