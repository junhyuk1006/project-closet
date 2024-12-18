package com.project.service.Admin;

import com.project.dto.AdminOrderDTO;
import com.project.repository.admin.AdminOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminOrderService {
    private final AdminOrderRepository adminOrderRepository;

    public List<AdminOrderDTO> getOrder(){
        return adminOrderRepository.findOrder();
    }
}
