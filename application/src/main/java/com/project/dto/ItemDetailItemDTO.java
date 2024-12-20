package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ItemDetailItemDTO {

    // Item 필드
    private Long itemId;
    private int itemCount;
    private String color;
    private String size;
    private String itemStatus;
    private Timestamp itemCreatedAt;

    // ItemDetail 필드
    private Long itemDetailId;
    private int itemPrice;
    private int views;
    private String itemName;
    private String itemCategory;
    private String mainImage;
    private String detailImage;
    private String itemDetailStatus;
    private Timestamp itemDetailCreatedAt;
}
