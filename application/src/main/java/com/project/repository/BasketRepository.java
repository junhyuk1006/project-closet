package com.project.repository;

import com.project.domain.Basket;
import com.project.dto.BasketItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query("SELECT new com.project.dto.BasketItemDTO(" +
           "b.id, b.isRecommendation, b.itemCount, b.size, b.color," +
           "u.id, i.id, i.item_price, i.item_name, i.item_category, i.main_image)" +
           "FROM Basket b " +
           "JOIN b.users u " +
           "JOIN b.itemDetail i WHERE u.id = :userId")
    List<BasketItemDTO> findByUserId(@Param("userId") Long userId);
}
