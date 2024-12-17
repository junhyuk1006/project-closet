package com.project.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class PointDTO {

    /** 변동 사항
     *  생성자 삭제
     *  사유: TotalPoint 를 별도로 계산 및 변수 저장하여 front로 호출 성공
     *  참고: PointRepository, PointService
     *  */


    private long id;
    private long userId;
    private int point;
    private String pointReason;
    private String pointType;
    private String pointInsertType;

    private Timestamp createdAt;
    private Timestamp deletedAt;
    private String status ="active";
}