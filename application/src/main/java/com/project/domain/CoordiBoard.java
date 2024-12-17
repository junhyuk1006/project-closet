package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;

@Entity
@DynamicInsert
@Data
@Table(name = "coordi_board")
public class CoordiBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String coordiTitle;
    private String coordiContent;
    private String coordiImage;
    private String status;

    @CreationTimestamp
    private Timestamp createdAt;

}
