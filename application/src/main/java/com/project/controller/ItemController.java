package com.project.controller;

import com.project.domain.Item;
import com.project.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
@RequiredArgsConstructor // 생성자를 통해 의존성을 주입받도록 설정
public class ItemController {

    private final ItemService itemService; // final 키워드 추가

    /*
    Backend JS 환경에서 Ajax 는  Post, Get 설정도 하고, Controller 에도 PostMapping, GetMapping 을 추가하여 연결했음
    React 환경에서는 Js, Jsx 에서는 Post, Get 설정은 하지 않고 Controller 어노테이션 만으로 기능 구현이 가능
    */

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems(); // DB 데이터 불러오는 함수
    }
}