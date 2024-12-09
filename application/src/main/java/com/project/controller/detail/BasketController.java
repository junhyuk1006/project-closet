package com.project.controller.detail;

import com.project.dto.BasketItemDTO;
import com.project.dto.ItemInquiryDTO;
import com.project.service.BasketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/basket")
@RequiredArgsConstructor // 생성자
public class BasketController {

    private final BasketService basketService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/saveBasket")
    public ResponseEntity<Map<String, String>> saveBasket(@RequestBody BasketItemDTO BasketItemDTO) {
        basketService.saveBasket(BasketItemDTO);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Inquiry saved successfully.");
        return ResponseEntity.ok(response);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/getBasket/{userId}")
    public ResponseEntity<List<BasketItemDTO>> getBasket(@PathVariable("userId") Long userId) {
        List<BasketItemDTO> basket = basketService.getBasket(userId);
        return ResponseEntity.ok(basket);
    }
}
