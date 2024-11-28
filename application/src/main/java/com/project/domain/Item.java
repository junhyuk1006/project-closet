package com.project.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Item {

    @Id
    private Long id;

    private String color;
    private String size;
    private String item_name;
    private String item_category;
    private int item_price;
    private int item_count;
    private String item_status;
    private Date created_at;

}
