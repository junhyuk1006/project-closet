package com.project.controller.admin;

import com.project.dto.AdminItemDTO;
import com.project.dto.PageRequestDTO;
import com.project.service.Admin.AdminItemService;
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
@RequestMapping("/api/admin/item")
@RequiredArgsConstructor
public class AdminItemController {

    private final AdminItemService adminItemService;

    @GetMapping("item")
    public Page<AdminItemDTO> getItems(@PageableDefault(size = 20,direction = Sort.Direction.DESC) Pageable pageable,
                                      @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminItemService.getItems(pageable, pageRequestDTO);
    }
}
