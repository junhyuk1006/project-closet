package com.project.domain;


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
    private int item_count;

    private String color;
    private String size;
    //private String item_name;
    //private String item_category;
    //private int item_price;
    private int item_count;
    private String status;

    @CreationTimestamp
    private LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "item_detail_id")
    private ItemDetail itemDetail;

}
