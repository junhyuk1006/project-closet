package com.project.repository;

import com.project.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    // userId로 전체 배송지 조회
    List<Address> findByUserId(long userId);
   
    // 배송지 삭제
    void deleteById(long id);

    // 대표 주소지 변경

    @Modifying
    @Query("UPDATE Address a SET a.isRepresent = " +
            "CASE " +
            "WHEN a.id = :id THEN true " +
            "WHEN a.isRepresent = true THEN false " +
            "ELSE a.isRepresent " +
            "END " +
            "WHERE a.userId = :userId")
    void switchRepresentativeAddress(@Param("id") long addressId, @Param("userId") long userId);
}
