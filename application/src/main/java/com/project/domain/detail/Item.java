package com.project.domain.detail;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int itemCount;

    private String color;
    private String size;
    //private String itemName;
    //private String item_category;
    //private int item_price;
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "item_detail_id")
    private ItemDetail itemDetail;

}
