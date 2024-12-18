package com.project.controller;

import com.project.domain.Notice;
import com.project.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {
    private final Logger logger = LoggerFactory.getLogger(HomeController.class);
    private final NoticeService noticeService;

    // 모든 공지 조회
    @GetMapping("/notices")
    public ResponseEntity<List<Notice>> getNotices() {
        return ResponseEntity.ok(noticeService.getNotices());
    }

    // 특정 공지 조회
    @GetMapping("/notices/{id}")
    public ResponseEntity<?> getNotice(@PathVariable Long id) {
        Notice notice = noticeService.findNoticeById(id);

        if(notice != null) {
            return ResponseEntity.status(200).body(notice);
        }
        return ResponseEntity.status(404).body("id: " + id + "에 해당하는 공지사항을 찾을 수 없습니다.");
    }
}
