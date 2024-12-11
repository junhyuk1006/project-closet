package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long gradeId;
    private String boardTitle;
    private String boardContent;
    private String boardImage;

    @CreationTimestamp
    private Timestamp createdAt;

}
