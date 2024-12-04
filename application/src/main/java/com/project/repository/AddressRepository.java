package com.project.repository;

import com.project.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT a from Address a WHERE a.userId = :userId ")
    List<Address> getAddressByUserid(@Param("userId") long userId);
}
