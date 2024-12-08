package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 20)
    private String grade;

    @Column(nullable = true,length = 30)
    private String description;

    @Column(nullable = true , columnDefinition = "INT DEFAULT 0")
    private int discount;

    @OneToMany(mappedBy = "grade",cascade = CascadeType.ALL)
    private List<User> users;
}
