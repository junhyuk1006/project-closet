package com.project.service;

import com.project.domain.Address;
import com.project.dto.*;
import com.project.repository.AddressRepository;
import com.project.repository.ItemInquiryRepository;
import com.project.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class MypageService {

    private final AddressRepository addressRepository;
    private final ItemInquiryRepository itemInquiryRepository;
    private final ReviewRepository reviewRepository;

    // userId로 등록된 배송지 조회( 대표 배송지 + 일반 배송지)
    public List<Address> findByUserId(@RequestParam("userId") long userId) {
        return addressRepository.findByUserId(userId);
    }

    // address의 id 정보값으로 주소값 삭제
    public void deleteById(@PathVariable("id") long id) {
        addressRepository.deleteById(id);
    }

    // 대표 주소지 변경
    public void switchRepresentativeAddress(long addressId, long userId) {
        addressRepository.switchRepresentativeAddress(addressId, userId);
    }

    public Page<UserItemInquiryDTO> getInquiriesByUser(Long userId, Pageable pageable) {
        return itemInquiryRepository.findByUsers_Id(userId, pageable);
    }


    public Page<UserItemReviewDTO> getMyReviews(Long userId, Pageable pageable) {
        return reviewRepository.getMyReviews(userId, pageable);
    }
}

