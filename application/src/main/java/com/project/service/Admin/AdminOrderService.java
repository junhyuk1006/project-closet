package com.project.service.Admin;

import com.project.dto.*;
import com.project.repository.admin.AdminExchangeRepository;
import com.project.repository.admin.AdminOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminOrderService {
    private final AdminOrderRepository adminOrderRepository;
    private final AdminExchangeRepository adminExchangeRepository;

    public Page<AdminOrderDTO> getOrder(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminOrderRepository.findOrder(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate());
    }

    public Page<AdminDeliveryDTO> getDelivery(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminOrderRepository.findDelivery(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate());
    }

    public Page<AdminExchangeDTO> getExchange(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminExchangeRepository.findExchange(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate());
    }

    public List<AdminOrderMonthDTO> getOrderMonth() {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusYears(1);
        return adminOrderRepository.findOrderMonth(startDate, endDate);
    }

    public AdminOrderDateDTO getOrderDate(Timestamp startDate, Timestamp endDate) {
        if(endDate != null){
            LocalDateTime endDateTime = endDate.toLocalDateTime();
            endDateTime = endDateTime.plusDays(1);
            endDate = Timestamp.valueOf(endDateTime);
        }
        return adminOrderRepository.findOrderDate(startDate, endDate);
    }
}
