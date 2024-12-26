package com.project.controller.admin;

import com.project.dto.*;
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

    @GetMapping("itemDetail")
    public Page<AdminItemDetailDTO> getItemDetails(@PageableDefault(size = 20,direction = Sort.Direction.DESC) Pageable pageable,
                                             @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminItemService.getItemDetails(pageable, pageRequestDTO);
    }

    @GetMapping("item")
    public Page<AdminItemDTO> getItems(@PageableDefault(size = 20,direction = Sort.Direction.DESC)Pageable pageable,
                                       @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminItemService.getItems(pageable, pageRequestDTO);
    }

    @GetMapping("review")
    public Page<AdminReviewDTO> getReview(@PageableDefault(size = 20,direction = Sort.Direction.DESC)Pageable pageable,
                                          @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminItemService.getReview(pageable, pageRequestDTO);
    }

    @GetMapping("ask")
    public Page<AdminAskDTO> getAsk(@PageableDefault(size = 20,direction = Sort.Direction.DESC)Pageable pageable,
                                    @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminItemService.getAsk(pageable, pageRequestDTO);
    }
}
