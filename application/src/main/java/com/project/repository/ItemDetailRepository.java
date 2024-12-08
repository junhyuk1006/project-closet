package com.project.repository;

import com.project.domain.detail.Item;
import com.project.dto.ItemDetailItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDetailRepository extends JpaRepository<Item, Long> {

    @Query("SELECT new com.project.dto.ItemDetailItemDTO(i.id, i.item_count, i.color, i.size, i.status, i.created_at, " +
            "d.id, d.item_price, d.views, d.item_name, d.item_category, d.main_image, d.detail_image, d.status, d.created_at) " +
            "FROM Item i JOIN i.itemDetail d WHERE d.id = :itemDetailId")
    List<ItemDetailItemDTO> findItemDetailWithItem(@Param("itemDetailId") Long itemDetailId);
}
