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
    public List<Notice> findNotice() {
        // 공지 데이터가 없을 경우 빈 리스트를 반환
        return noticeRepository.findAll();
    }

    // 특정 공지 조회
    public Notice findNoticeById(Long id) {
        // id에 해당하는 공지 데이터가 없을 경우 예외를 던짐
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("[ID: " + id + "]에 해당하는 공지사항을 찾을 수 없습니다."));
    }
}
