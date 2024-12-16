package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "board_reply")
public class BoardReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long boardId; // 게시글 ID
    private Long userId;  // 댓글 작성자 ID
    private Long gradeId; // 등급 정보 (Optional)

    private String replyContent; // 댓글 내용
    private int parentId; // 부모 댓글 ID (대댓글 용도)

    @CreationTimestamp
    private Timestamp createdAt; // 작성일
}