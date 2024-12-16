package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "notice")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String subject;
    private String content;
    private Timestamp createdAt;
    private String status;
}
