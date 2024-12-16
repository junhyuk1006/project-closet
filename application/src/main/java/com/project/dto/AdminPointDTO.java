package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminPointDTO {
    private Long id;
    private String email;
    private String nickname;
    private String pointReason;
    private String pointType;
    @CreationTimestamp
    private Timestamp createdAt;
    @CreationTimestamp
    private Timestamp deletedAt;
    private int point;
    private String status;
}
