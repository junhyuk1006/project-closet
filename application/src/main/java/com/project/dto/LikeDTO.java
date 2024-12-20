package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LikeDTO {

    private Long coordiBoardId;
    private Long userId;
    private boolean liked;
    private Long likeCount;
}
