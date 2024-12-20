package com.project.controller;

import com.project.dto.OrderHistoryDTO;
import com.project.service.OrderHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    /**
     * 주문 내역 저장
     * @param orderHistoryDTO 주문 내역 DTO
     * @return 저장된 주문 내역 ID
     */
    @PostMapping
    public ResponseEntity<Long> saveOrderHistory(@RequestBody OrderHistoryDTO orderHistoryDTO) {
        System.out.println("save order history");
        Long savedOrderId = orderHistoryService.saveOrderHistory(orderHistoryDTO).getId();
        return ResponseEntity.ok(savedOrderId);
    }

    /**
     * 주문 내역 조회
     * @param orderId 주문 ID
     * @return 주문 내역 DTO
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderHistoryDTO> getOrderHistory(@PathVariable Long orderId) {
        OrderHistoryDTO orderHistoryDTO = orderHistoryService.getOrderHistory(orderId);
        return ResponseEntity.ok(orderHistoryDTO);
    }
}