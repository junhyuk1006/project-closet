package com.project.dto;

import lombok.Data;

@Data
public class ReservationDTO {
    private long userId;
    private long coordiId;
    private String reservationDate;
}
