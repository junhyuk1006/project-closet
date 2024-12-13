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
}
