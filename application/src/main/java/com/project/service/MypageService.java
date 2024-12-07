package com.project.service;

import com.project.domain.Address;
import com.project.repository.AddressRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MypageService {

    private final AddressRepository addressRepository;

    // userId로 등록된 배송지 조회( 대표 배송지 + 일반 배송지)
    public List<Address> findByUserId(@RequestParam("userId") long userId) {
        return addressRepository.findByUserId(userId);
    }

    // address의 id 정보값으로 주소값 삭제
    public void deleteById(@PathVariable("id") long id) {
        addressRepository.deleteById(id);
    }


    public void switchRepresentativeAddress(@PathVariable("id") long id,
                                                                     @RequestParam("userId") long userId) {
       addressRepository.switchRepresentativeAddress(id,userId);
    }
}

