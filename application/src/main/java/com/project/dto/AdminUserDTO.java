package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminUserDTO {
    private Long id;
    private String username;
    private String nickname;
    private String grade;
    private String birth;
    private Long point;
    private Long buy;
    private String status;

    @CreationTimestamp
    private Timestamp createdAt;
}
