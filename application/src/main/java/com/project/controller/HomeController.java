package com.project.controller;

import com.project.domain.Notice;
import com.project.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeController {
    private final Logger logger = LoggerFactory.getLogger(HomeController.class);
    private final NoticeService noticeService;

    // 모든 공지 조회
    @GetMapping("/notices")
    public ResponseEntity<?> getNotices() {
        List<Notice> notices = noticeService.findNotice();

        if (notices.isEmpty()) {
            // 공지 데이터가 없을 경우 비어있는 데이터 반환
            return ResponseEntity.noContent().build();
        }
        // 상태값과 데이터를 반환
        return ResponseEntity.status(200).body(notices);
    }

    // 특정 공지 조회
    @GetMapping("/notices/{id}")
    public ResponseEntity<?> getNotice(@PathVariable Long id) {
        // 예외 처리
        try {
            Notice notice = noticeService.findNoticeById(id);
            return ResponseEntity.status(200).body(notice);
        } catch (IllegalArgumentException e) {
            logger.error(e.getMessage());
            return ResponseEntity.noContent().build();
        }
    }
}
