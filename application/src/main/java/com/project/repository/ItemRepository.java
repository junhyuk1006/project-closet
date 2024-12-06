package com.project.repository;

import com.project.domain.ItemDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<ItemDetail, Long> {
    // 기본적으로 findAll() 메서드 제공

}

