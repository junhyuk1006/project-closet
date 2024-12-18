package com.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;

@Entity
@DynamicInsert
@Data
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // (fetch = FetchType.LAZY) -> 성능
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false) // 기존 외래 키와 참조 키
    //@JsonIgnore
    private Users user; // Users 테이블의 ID와 매핑

    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String status;

    @CreationTimestamp
    private Timestamp createdAt;

}
