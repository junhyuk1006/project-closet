package com.project.domain.detail;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "item_detail")
public class ItemDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int itemPrice;
    private int views;

    @Column(name = "item_name")
    private String itemName;
    private String itemCategory;
    private String mainImage;
    private String detailImage;
    private String status;

    @CreationTimestamp
    private Timestamp createdAt;

    @OneToMany(mappedBy = "itemDetail")
    private List<Item> items;
}
