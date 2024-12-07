package com.project.controller;

import com.project.dto.ReviewDTO;
import com.project.dto.UserItemReviewDTO;
import com.project.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // 생성자
public class ReviewController {

    private final ReviewService reviewService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/saveReview")
    public ResponseEntity<Map<String, String>> saveReview(@RequestBody ReviewDTO review) {
        reviewService.saveReview(review);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Review saved successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findAllReview/{itemId}")
    public List<UserItemReviewDTO> findReview(@PathVariable("itemId") Long itemId) {
        return reviewService.findAllReviews(itemId);
    }

}
