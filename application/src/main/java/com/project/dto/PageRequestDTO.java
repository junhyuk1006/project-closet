package com.project.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class PageRequestDTO {
    private String searchKeyword;
    private String searchInput;

    private Timestamp startDate;

    private Timestamp endDate;
    private String level;
}
