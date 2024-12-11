package com.project.domain.detail;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "item_detail")
public class ItemDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int item_price;
    private int views;

    private String item_name;
    private String item_category;
    private String main_image;
    private String detail_image;
    private String status;

    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "itemDetail")
    private List<Item> items;
}
