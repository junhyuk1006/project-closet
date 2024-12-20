package com.project.controller.admin;

import com.project.domain.Notice;
import com.project.dto.AdminNoticeDTO;
import com.project.dto.PageRequestDTO;
import com.project.service.Admin.AdminPageService;
import com.project.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/page")
@RequiredArgsConstructor
public class AdminNoticeController {
    private final AdminPageService adminPageService;

    @GetMapping("notice")
    public Page<AdminNoticeDTO> getNotice(@PageableDefault(size = 20,direction = Sort.Direction.DESC) Pageable pageable,
                                          @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminPageService.getNotice(pageable, pageRequestDTO);
    }
}
