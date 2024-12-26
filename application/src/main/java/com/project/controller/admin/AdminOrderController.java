package com.project.controller.admin;

import com.project.dto.*;
import com.project.service.Admin.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;


@RestController
@RequestMapping("/api/admin/order")
@RequiredArgsConstructor
public class AdminOrderController {
    private final AdminOrderService adminOrderService;
    @GetMapping("order")
    public Page<AdminOrderDTO> getOrder(@PageableDefault(size = 20,direction = Sort.Direction.DESC) Pageable pageable,
                                        @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminOrderService.getOrder(pageable,pageRequestDTO);
    }

    @GetMapping("delivery")
    public Page<AdminDeliveryDTO> getDelivery(@PageableDefault(size = 20, direction = Sort.Direction.DESC) Pageable pageable, @ModelAttribute PageRequestDTO pageRequestDTO) {
        return adminOrderService.getDelivery(pageable,pageRequestDTO);
    }

    @GetMapping("month")
    public List<AdminOrderMonthDTO> getOrderMonth(){
        return adminOrderService.getOrderMonth();
    }

    @GetMapping("orderDate")
    public AdminOrderDateDTO getOrderDate(@RequestParam(required = false)Timestamp startDate
            ,@RequestParam(required = false)Timestamp endDate ){
        return adminOrderService.getOrderDate(startDate,endDate);
    }
}
