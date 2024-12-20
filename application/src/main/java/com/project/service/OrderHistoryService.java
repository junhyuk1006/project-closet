package com.project.service;

import com.project.domain.OrderHistory;
import com.project.domain.OrderDetail;
import com.project.dto.OrderHistoryDTO;
import com.project.dto.OrderDetailDTO;
import com.project.repository.OrderHistoryRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderHistoryService {

    private final OrderHistoryRepository orderHistoryRepository;
    private final UserRepository userRepository;

    /**
     * 주문 내역 저장
     *
     * @param orderHistoryDTO 주문 내역 DTO
     * @return 저장된 OrderHistory
     */
    public OrderHistory saveOrderHistory(OrderHistoryDTO orderHistoryDTO) {
        OrderHistory orderHistory = new OrderHistory();

        // 사용자 정보 설정
        orderHistory.setUser(userRepository.findById(orderHistoryDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다.")));

        // 주문 상세 설정
        List<OrderDetail> orderDetails = orderHistoryDTO.getOrderDetails().stream()
                .map(detailDTO -> {
                    OrderDetail detail = new OrderDetail();
                    detail.setItemName(detailDTO.getItemName());
                    detail.setItemPrice(detailDTO.getItemPrice());
                    detail.setItemCount(detailDTO.getItemCount());
                    detail.setColor(detailDTO.getColor());
                    detail.setSize(detailDTO.getSize());
                    detail.setItemMainImage(detailDTO.getItemMainImage());
                    detail.setOrderHistory(orderHistory);
                    return detail;
                }).collect(Collectors.toList());
        orderHistory.setOrderDetails(orderDetails);

        // 결제 정보 설정
        orderHistory.setPointUsedAmount(orderHistoryDTO.getPointUsedAmount());
        orderHistory.setTotalPaymentAmount(orderHistoryDTO.getTotalPaymentAmount());
        orderHistory.setFinalPaymentAmount(orderHistoryDTO.getFinalPaymentAmount());
        orderHistory.setPaymentStatus(orderHistoryDTO.getPaymentStatus());
        orderHistory.setPaymentMethod(orderHistoryDTO.getPaymentMethod());

        // 주문 번호 생성 로직
        orderHistory.setOrderNumber(generateOrderNumber());

        return orderHistoryRepository.save(orderHistory);
    }

    /**
     * 주문 번호 생성 로직
     * @return 새로운 주문 번호
     */
    private int generateOrderNumber() {
        int currentYear = LocalDateTime.now().getYear();
        Long count = orderHistoryRepository.countByOrderNumberStartsWith(currentYear);
        return Integer.parseInt(currentYear + String.format("%03d", count + 1));
    }

    /**
     * 주문 내역 조회
     * @param orderId 주문 내역 ID
     * @return 주문 내역 DTO
     */
    public OrderHistoryDTO getOrderHistory(Long orderId) {
        OrderHistory orderHistory = orderHistoryRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문을 찾을 수 없습니다."));

        OrderHistoryDTO dto = new OrderHistoryDTO();
        dto.setId(orderHistory.getId());
        dto.setUserId(orderHistory.getUser().getId());
        dto.setOrderNumber(orderHistory.getOrderNumber());
        dto.setPointEarnedAmount(orderHistory.getPointEarnedAmount());
        dto.setPointUsedAmount(orderHistory.getPointUsedAmount());
        dto.setTotalPaymentAmount(orderHistory.getTotalPaymentAmount());
        dto.setFinalPaymentAmount(orderHistory.getFinalPaymentAmount());
        dto.setPaymentStatus(orderHistory.getPaymentStatus());
        dto.setPaymentMethod(orderHistory.getPaymentMethod());
        dto.setPaymentDate(orderHistory.getPaymentDate());

        List<OrderDetailDTO> detailDTOs = new ArrayList<>();
        for (OrderDetail detail : orderHistory.getOrderDetails()) {
            OrderDetailDTO detailDTO = new OrderDetailDTO();
            detailDTO.setId(detail.getId());
            detailDTO.setItemName(detail.getItemName());
            detailDTO.setItemCount(detail.getItemCount());
            detailDTO.setItemPrice(detail.getItemPrice());
            detailDTO.setColor(detail.getColor()); // 추가된 필드
            detailDTO.setSize(detail.getSize()); // 추가된 필드
            detailDTO.setItemMainImage(detail.getItemMainImage()); // 추가된 필드
            detailDTOs.add(detailDTO);
        }
        dto.setOrderDetails(detailDTOs);

        return dto;
    }
}