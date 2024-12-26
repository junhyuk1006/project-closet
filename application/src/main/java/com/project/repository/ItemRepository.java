package com.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.domain.detail.ItemDetail;
import com.project.dto.ItemAllDTO;

@Repository
public interface ItemRepository extends JpaRepository<ItemDetail, Long> {
    @Query("SELECT new com.project.dto.ItemAllDTO(i.id, i.itemName, i.itemCategory, i.itemPrice, i.mainImage, i.detailImage, i.views, i.status) " +
            "FROM ItemDetail i " +
            "WHERE i.status = 'active' ")
    Page<ItemAllDTO> findAllByStatusActive(Pageable pageable);

}

