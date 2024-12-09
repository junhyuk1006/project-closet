package com.project.service;

import com.project.domain.detail.ItemReview;
import com.project.dto.ReviewDTO;
import com.project.dto.UserItemReviewDTO;
import com.project.repository.ReviewRepository;
import com.project.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UsersRepository usersRepository;

    public Long getReviewCountByItemId(Long itemId) {return reviewRepository.countInquiry(itemId);}


    public void saveReview(ReviewDTO reviewDTO) {
        // 중복 확인
        if (reviewRepository.existsByUsersIdAndItemId(reviewDTO.getUser_id(), reviewDTO.getItem_id())) {
            throw new IllegalStateException("이미 리뷰를 작성 하셨습니다.");
        }

        // DTO → 엔티티 변환
        ItemReview review = new ItemReview();
        review.setId(reviewDTO.getId());
        review.setItemId(reviewDTO.getItem_id());
        review.setScore(reviewDTO.getScore());
        review.setReview_image(reviewDTO.getReview_image());
        review.setReview_content(reviewDTO.getReview_content());
        review.setStatus(reviewDTO.getStatus() != null ? reviewDTO.getStatus() : "active");

        // 유저 설정
        review.setUsers(usersRepository.findById(reviewDTO.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found")));

        // 엔티티 저장
        reviewRepository.save(review);
    }





    public List<UserItemReviewDTO> findAllReviews(Long item_id) {
        return reviewRepository.findUserItemReviewDTOByItemId(item_id);
    }

    public void updateReview(Long reviewId, ReviewDTO reviewDTO) {
        ItemReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalStateException("Review not found"));

        // 기존 리뷰 내용 업데이트
        review.setReview_content(reviewDTO.getReview_content());
        review.setReview_image(reviewDTO.getReview_image());

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
