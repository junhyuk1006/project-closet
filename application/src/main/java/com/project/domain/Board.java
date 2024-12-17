package com.project.domain;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private Timestamp createdAt;

}
