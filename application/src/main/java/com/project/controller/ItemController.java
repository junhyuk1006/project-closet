package com.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ItemAllDTO;
import com.project.dto.ItemDetailItemDTO;
import com.project.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // 생성자를 통해 의존성을 주입받도록 설정
public class ItemController {
    private final Logger logger = LoggerFactory.getLogger(ItemController.class);  // 로그를 찍기 위한 객체 생성

    private final ItemService itemService; // final 키워드 추가

    @GetMapping("/itemAll")
    public List<ItemAllDTO> getAllItems() {
        return itemService.getAllItems(); // DB 데이터 불러오는 함수
    }


    @GetMapping("/itemDetail/{itemDetailId}")
    public ResponseEntity<?> getItemsByItemDetailId(@PathVariable("itemDetailId") Long itemDetailId) {
        try {
            // SecurityContext에서 Authentication 가져오기
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // 로그인 여부 확인 (익명 사용자인 경우 처리)
            if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
                // 비로그인 사용자에게 기본 데이터 제공
                List<ItemDetailItemDTO> items = itemService.getItemsByItemDetailId(itemDetailId);
                if (items.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }

                // 응답 데이터 생성
                Map<String, Object> response = new HashMap<>();
                response.put("items", items);
                response.put("userId", null); // 비로그인 상태에서는 userId를 null로 반환

                return ResponseEntity.ok().body(response);
            }

            // 로그인된 사용자 처리
            String principal = authentication.getPrincipal().toString();
            Long userId;
            try {
                userId = Long.parseLong(principal);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Invalid user ID format in principal");
            }

            // 로그인된 사용자에게 상세 데이터 제공
            List<ItemDetailItemDTO> items = itemService.getItemsByItemDetailId(itemDetailId);
            if (items.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // 응답 데이터 생성
            Map<String, Object> response = new HashMap<>();
            response.put("items", items);
            response.put("userId", userId);

            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing the request");
        }
    }

    // 상위 3개의 아이템을 category(조회수, 좋아요 순위 등)로 조회하는 메서드
    @GetMapping("/items/top/{category}")
    public ResponseEntity<List<ItemAllDTO>> getTop3ItemsByCategory(@PathVariable("category") String category) {
        logger.info("(ItemController) category: {}", category);
        return ResponseEntity.ok(itemService.getTop3ItemsByCategory(category));
    }
}