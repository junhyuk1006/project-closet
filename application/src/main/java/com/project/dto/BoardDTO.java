package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class BoardDTO {
    private Long id;
    private Long userId;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    @CreationTimestamp
    private Timestamp createdAt;
    private String nickname;
}
