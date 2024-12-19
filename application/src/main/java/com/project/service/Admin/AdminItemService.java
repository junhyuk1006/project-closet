package com.project.service.Admin;

import com.project.dto.AdminItemDTO;
import com.project.dto.PageRequestDTO;
import com.project.repository.admin.AdminItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminItemService {
    private final AdminItemRepository adminItemRepository;

    public Page<AdminItemDTO> getItems(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminItemRepository.findItem(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate(),
                pageRequestDTO.getMinPrice(),
                pageRequestDTO.getMaxPrice(),
                pageRequestDTO.getCategory(),
                pageRequestDTO.getStatus());
    }
}
