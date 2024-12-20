package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class PageRequestDTO {
    private String searchKeyword;
    private String searchInput;

    private Timestamp startDate;

    private Timestamp endDate;
    private String grade;
    private Integer minPrice;
    private Integer maxPrice;
    private Integer minCount;
    private Integer maxCount;
    private String category;
    private String status;

    public Timestamp getEndDate() {
        if(this.endDate != null){
            LocalDateTime adjustEndDate = this.endDate.toLocalDateTime().plusDays(1);
            return Timestamp.valueOf(adjustEndDate);
        }
        return null;
    }
}
