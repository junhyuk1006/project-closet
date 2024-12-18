package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoardReplyDTO {
    private Long id;
    private Long boardId;
    private String replyContent;
    private Long userId;
    private String nickname;
}
