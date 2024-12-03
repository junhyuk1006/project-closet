package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "point")
public class Point {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private long user_id;
    private String point_reason;
    private int point;
    private String point_type;

    @CreationTimestamp
    private Timestamp created_at;

    private Timestamp deleted_at;
    private String status;

}
