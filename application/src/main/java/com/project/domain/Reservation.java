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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Users user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "coordi_id", referencedColumnName = "id", nullable = true) // coordi_id를 Users의 id에 매핑
    private Users coordi; // 코디네이터 정보


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX", timezone = "UTC")
    private Timestamp reservationDate;
    private String reservationStatus;
}
