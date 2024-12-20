package com.project.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY) // Users와의 다대일 관계 설정
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false) // user_id를 Users의 id에 매핑
    private Users user;

    private long coordiId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX", timezone = "UTC")
    private Timestamp reservationDate;
    private String reservationStatus;
}
