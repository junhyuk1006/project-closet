package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="address")
public class Address {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @Column(name="user_id")
    private long userId;
    private String address;


    @Column(name = "isRepresent", columnDefinition = "TINYINT(1)")
    private Integer isRepresent; // Integer로 변경

}
