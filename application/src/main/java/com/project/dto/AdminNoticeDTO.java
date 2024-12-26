package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class AdminNoticeDTO {
    private Long id;
    private String subject;
    private String content;
    private Timestamp createdAt;
    private String status;
}
