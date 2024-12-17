package com.project.controller.admin;

import com.project.dto.AdminOrderDTO;
import com.project.service.Admin.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order")
@RequiredArgsConstructor
public class AdminOrderController {
    private final AdminOrderService adminOrderService;
    @GetMapping("all")
    public List<AdminOrderDTO> getOrder(){
        return adminOrderService.getOrder();
    }
}
