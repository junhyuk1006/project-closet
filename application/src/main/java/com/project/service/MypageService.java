package com.project.service;

import com.project.domain.Address;
import com.project.domain.detail.ItemInquiry;
import com.project.dto.CustomUserDetail;
import com.project.dto.ItemInquiryDTO;
import com.project.dto.ResponseDTO;
import com.project.dto.UserItemInquiryDTO;
import com.project.repository.AddressRepository;
import com.project.repository.ItemInquiryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MypageService {

    private final AddressRepository addressRepository;
    private final ItemInquiryRepository itemInquiryRepository;

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





}

