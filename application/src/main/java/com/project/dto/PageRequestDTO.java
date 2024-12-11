package com.project.dto;

import lombok.Data;

@Data
public class PageRequestDTO {
    private String searchKeyword;
    private String searchInput;
    private String startDate;
    private String endDate;
    private String level;
}
