package com.project.repository;

import com.project.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    // userId로 전체 배송지 조회
    List<Address> findByUserId(long userId);

    List<Address> findById(long id);
}
