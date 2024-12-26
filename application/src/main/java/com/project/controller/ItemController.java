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
    public List<ItemDetailItemDTO> getItemDetail(@PathVariable Long itemDetailId) {
        return itemService.getItemsByItemDetailId(itemDetailId);
    }

    // 상위 3개의 아이템을 category(조회수, 좋아요 순위 등)로 조회하는 메서드
    @GetMapping("/items/top/{category}")
    public ResponseEntity<List<ItemAllDTO>> getTop3ItemsByCategory(@PathVariable("category") String category) {
        logger.info("(ItemController) category: {}", category);
        return ResponseEntity.ok(itemService.getTop3ItemsByCategory(category));
    }
}