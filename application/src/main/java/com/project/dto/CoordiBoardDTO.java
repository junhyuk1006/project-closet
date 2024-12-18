package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoordiBoardDTO {
    private Long id;
    private Long userId;
    private String coordiTitle;
    private String coordiContent;
    private String coordiImage;
    private String nickname; // 작성자 닉네임
}
