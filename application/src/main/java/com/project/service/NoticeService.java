package com.project.service;

import com.project.domain.Notice;
import com.project.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    // 모든 공지 조회
    public List<Notice> getNotices() {
        return noticeRepository.findAll();
    }
}
