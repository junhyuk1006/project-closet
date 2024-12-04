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

    public List<Address> getAddressByUserid(@RequestParam("userId") long userId) {
        return addressRepository.getAddressByUserid(userId);
    }
}
