package com.project.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PointDTO {


    private long id;
    private long userId;
    private int point;
    private String pointReason;
    private String pointType;

    private Timestamp createdAt;
    private Timestamp deletedAt;
    private String status;

    private int totalUserPoint;

    public PointDTO(long id, long userId, int point, String pointReason, String pointType, Timestamp createdAt, Timestamp deletedAt, String status) {
        this.id = id;
        this.userId = userId;
        this.point = point;
        this.pointReason = pointReason;
        this.pointType = pointType;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
        this.status = status;
    }
}
