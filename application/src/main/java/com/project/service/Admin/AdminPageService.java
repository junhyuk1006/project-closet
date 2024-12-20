package com.project.service.Admin;

import com.project.dto.AdminNoticeDTO;
import com.project.dto.PageRequestDTO;
import com.project.repository.admin.AdminNoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminPageService {
    private final AdminNoticeRepository adminNoticeRepository;

    public Page<AdminNoticeDTO> getNotice(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminNoticeRepository.findNotice(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate());
    }
}
