package com.project.controller;

import com.project.dto.ItemAllDTO;
import com.project.dto.ItemDetailItemDTO;
import com.project.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<ItemDetailItemDTO>> getItemsByItemDetailId(@PathVariable("itemDetailId") Long itemDetailId) {
        System.out.println("Received itemDetailId: " + itemDetailId);
        List<ItemDetailItemDTO> items = itemService.getItemsByItemDetailId(itemDetailId);
        if (items.isEmpty()) {
            System.out.println("No items found for itemDetailId: " + itemDetailId);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(items);
    }

    // 상위 3개의 아이템을 category(조회수, 좋아요 순위 등)로 조회하는 메서드
    @GetMapping("/items/top/{category}")
    public ResponseEntity<List<ItemAllDTO>> getTop3ItemsByCategory(@PathVariable("category") String category) {
        logger.info("(ItemController) category: {}", category);
        return ResponseEntity.ok(itemService.getTop3ItemsByCategory(category));
    }
}