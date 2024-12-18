package com.project.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "coordi_board_like")
@Data
public class CoordiBoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "coordi_board_id", nullable = false)
    private Long coordiBoardId;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
