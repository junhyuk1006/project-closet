package com.project.service;

import com.project.domain.Notice;
import com.project.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    // 모든 공지 조회
    public List<Notice> getNotices() {
        return noticeRepository.findAll();
    }

    // 특정 공지 조회
    public Notice findNoticeById(Long id) {
        Optional<Notice> notice = noticeRepository.findById(id);
        return notice.orElse(null);
    }
}
