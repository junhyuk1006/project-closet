package com.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
@Builder
@Data
@AllArgsConstructor
public class UserReservationDTO {

    //User
    private long userId;
    private String nickname;


    //Reservation
    private long reservationId;
    private long coordiId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX", timezone = "UTC")
    private Timestamp reservationDate;
    private String reservationStatus;


}
