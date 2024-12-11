package com.project.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY) // (fetch = FetchType.LAZY) -> 성능
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false) // 기존 외래 키와 참조 키
    private Users user; // Users 테이블의 ID와 매핑

    private String pointReason;
    private int point;
    private String pointType;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul") // 날짜 포맷 지정
    private Timestamp createdAt;


    private Timestamp deletedAt;
    private String status;
}
