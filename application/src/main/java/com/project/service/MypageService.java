package com.project.service;

import com.project.domain.Address;
import com.project.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final AddressRepository addressRepository;

    // userId로 등록된 배송지 조회( 대표 배송지 + 일반 배송지)
    public List<Address> findByUserId(@RequestParam("userId") long userId) {
        return addressRepository.findByUserId(userId);
    }





}

