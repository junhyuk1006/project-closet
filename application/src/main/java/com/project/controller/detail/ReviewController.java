package com.project.controller.detail;

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
        Map<String, String> response = new HashMap<>();
        try {
            reviewService.saveReview(review);
            response.put("message", "Review saved successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            // 중복 리뷰 예외 처리
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception e) {
            // 기타 예외 처리
            response.put("message", "An error occurred while saving the review");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/findAllReview/{itemId}")
    public List<UserItemReviewDTO> findReview(@PathVariable("itemId") Long itemId) {
        return reviewService.findAllReviews(itemId);
    }

    @GetMapping("/countReview/{itemId}")
    public Long countReview(@PathVariable("itemId") Long itemId) {return reviewService.getReviewCountByItemId(itemId);}

    @PutMapping("/updateReview/{reviewId}")
    public ResponseEntity<String> updateReview(@PathVariable Long reviewId, @RequestBody ReviewDTO reviewDTO) {
        reviewService.updateReview(reviewId, reviewDTO);
        return ResponseEntity.ok("Review updated successfully");
    }

    @PatchMapping("/deactivateReview/{reviewId}")
    public ResponseEntity<String> deactivateReview(@PathVariable Long reviewId) {
        reviewService.deactivateReview(reviewId);
        return ResponseEntity.ok("리뷰 비활성화가 완료 되었습니다");
    }

    @PatchMapping("/activateReview/{reviewId}")
    public ResponseEntity<String> activateReview(@PathVariable Long reviewId) {
        reviewService.activateReview(reviewId);
        return ResponseEntity.ok("리뷰 활성화가 완료 되었습니다");
    }

}
