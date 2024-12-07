package com.project.service;

import com.project.domain.ItemReview;
import com.project.dto.ReviewDTO;
import com.project.dto.UserItemReviewDTO;
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

/*    public ReviewDTO saveReview(ReviewDTO reviews) {
        return reviewDTORepository.save(reviews);
    }*/

    public void saveReview(ReviewDTO reviewDTO) {
        // DTO → 엔티티 변환
        ItemReview review = new ItemReview();
        review.setId(reviewDTO.getId());
        review.setItem_id(reviewDTO.getItem_id());
        review.setScore(reviewDTO.getScore());
        review.setReview_image(reviewDTO.getReview_image());
        review.setReview_content(reviewDTO.getReview_content());
        review.setStatus(reviewDTO.getStatus() != null ? reviewDTO.getStatus() : "active");

        // 유저 설정
        review.setUsers(userRepository.findById(reviewDTO.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found")));

        // 엔티티 저장
        reviewRepository.save(review);
    }

    public List<UserItemReviewDTO> findAllReviews(Long item_id) {
        return reviewRepository.findUserItemReviewDTOByItemId(item_id);
    }
}
