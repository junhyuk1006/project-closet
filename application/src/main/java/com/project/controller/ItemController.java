package com.project.controller;

import com.project.dto.ItemAllDTO;
import com.project.dto.ItemDetailItemDTO;
import com.project.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // 생성자를 통해 의존성을 주입받도록 설정
public class ItemController {

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


}