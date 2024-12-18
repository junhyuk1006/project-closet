package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
// CRUD 모두 사용 가능한 ResponseDTO
public class ResponseDTO<T> {
    private String status;   // 성공 여부
    private String message;  // 결과 메시지
    private String error;    // 에러 메시지
    private T data;          // 데이터
}
