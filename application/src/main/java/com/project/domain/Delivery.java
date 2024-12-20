package com.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "delivery")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String deliveryNumber;
    private String deliveryStatus;
    private int deliveryFee;

    @OneToOne(mappedBy = "delivery",fetch = FetchType.LAZY)
    @JsonIgnore
    private OrderHistory orderHistory;
}
