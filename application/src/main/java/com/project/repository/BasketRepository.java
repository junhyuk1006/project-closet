package com.project.repository;

import com.project.domain.Basket;
import com.project.dto.BasketItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query("SELECT new com.project.dto.BasketItemDTO(" +
           "b.id, b.isRecommendation, b.itemCount, b.size, b.color, b.status," +
           "u.id, i.id, i.itemPrice, i.itemName, i.itemCategory, i.mainImage)" +
           "FROM Basket b " +
           "JOIN b.users u " +
           "JOIN b.itemDetail i WHERE u.id = :userId")
    List<BasketItemDTO> findByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Basket b SET b.status = :status WHERE b.id IN :basketIds")
    int updateStatusForBaskets(List<Long> basketIds, String status);
}
