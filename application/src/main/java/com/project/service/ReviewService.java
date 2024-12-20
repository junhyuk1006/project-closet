package com.project.service;

import com.project.domain.Users;
import com.project.domain.detail.ItemDetail;
import com.project.domain.detail.ItemReview;
import com.project.dto.ReviewDTO;
import com.project.dto.UserItemReviewDTO;
import com.project.repository.ItemRepository;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public Long getReviewCountByItemId(Long itemId) {return reviewRepository.countInquiry(itemId);}


    public void saveReview(ReviewDTO reviewDTO) {
        // 중복 확인
        if (reviewRepository.existsByUsersIdAndItemDetailId(reviewDTO.getUserId(), reviewDTO.getItemDetailId())) {
            throw new IllegalStateException("이미 리뷰를 작성하셨습니다.");
        }

        // DTO → 엔티티 변환
        ItemReview review = new ItemReview();
        review.setScore(reviewDTO.getScore());
        review.setReviewImage(reviewDTO.getReviewImage());
        review.setReviewContent(reviewDTO.getReviewContent());
        review.setStatus(reviewDTO.getStatus() != null ? reviewDTO.getStatus() : "active");

        // 연관 엔티티 조회
        Users user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        ItemDetail itemDetail = itemRepository.findById(reviewDTO.getItemDetailId())
                .orElseThrow(() -> new RuntimeException("ItemDetail not found"));

        // 연관 엔티티 설정
        review.setUsers(user);
        review.setItemDetail(itemDetail);

        // 저장
        reviewRepository.save(review);
    }

    public List<UserItemReviewDTO> findAllReviews(Long itemId) {
        return reviewRepository.findUserItemReviewDTOByItemId(itemId);
    }

    public void updateReview(Long reviewId, ReviewDTO reviewDTO) {
        ItemReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalStateException("Review not found"));

        // 기존 리뷰 내용 업데이트
        review.setReviewContent(reviewDTO.getReviewContent());
        review.setReviewImage(reviewDTO.getReviewImage());

        reviewRepository.save(review);
    }

    public void deactivateReview(Long reviewId) {
        ItemReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalStateException("Review not found"));

        // 상태를 'inactive'로 변경
        review.setStatus("inactive");

        reviewRepository.save(review);
    }

    public void activateReview(Long reviewId) {
        ItemReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalStateException("Review not found"));

        // 상태를 'active'로 변경
        review.setStatus("active");

        reviewRepository.save(review);
    }
}
