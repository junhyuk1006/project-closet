package com.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
public class ExchangeItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_history_id",referencedColumnName = "id")
    @JsonIgnore
    private OrderHistory orderHistory;

    private String exchangeImage;
    private String exchangeDeliveryNumber;
    private Timestamp requestedAt;
    private Timestamp completedAt;
    private String description;
}
