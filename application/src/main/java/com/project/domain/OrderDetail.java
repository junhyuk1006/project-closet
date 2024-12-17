package com.project.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_history_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private OrderHistory orderHistory;

    private String itemName;
    private int itemPrice;
    private int itemCount;
    private String color;
    private String size;
    private String itemMainImage;

}
