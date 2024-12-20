package com.project.service.Admin;

import com.project.dto.AdminItemDTO;
import com.project.dto.AdminItemDetailDTO;
import com.project.dto.AdminReviewDTO;
import com.project.dto.PageRequestDTO;
import com.project.repository.admin.AdminItemDetailRepository;
import com.project.repository.admin.AdminItemRepository;
import com.project.repository.admin.AdminReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminItemService {
    private final AdminItemDetailRepository adminItemDetailRepository;
    private final AdminItemRepository adminItemRepository;
    private final AdminReviewRepository adminReviewRepository;

    public Page<AdminItemDetailDTO> getItemDetails(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminItemDetailRepository.findItemDetail(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate(),
                pageRequestDTO.getMinPrice(),
                pageRequestDTO.getMaxPrice(),
                pageRequestDTO.getCategory(),
                pageRequestDTO.getStatus());
    }

    public Page<AdminItemDTO> getItems(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminItemRepository.findItem(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate(),
                pageRequestDTO.getMinCount(),
                pageRequestDTO.getMaxCount(),
                pageRequestDTO.getCategory(),
                pageRequestDTO.getStatus());
    }

    public Page<AdminReviewDTO> getReview(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminReviewRepository.findReview(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate());
    }
}
