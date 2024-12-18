package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PageRequestDTO {
    private String searchKeyword;
    private String searchInput;

    private Timestamp startDate;

    private Timestamp endDate;
    private String grade;

    public Timestamp getEndDate() {
        if(this.endDate != null){
            LocalDateTime adjustEndDate = this.endDate.toLocalDateTime().plusDays(1);
            return Timestamp.valueOf(adjustEndDate);
        }
        return null;
    }
}
