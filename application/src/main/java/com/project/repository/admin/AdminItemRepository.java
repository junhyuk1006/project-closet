package com.project.repository.admin;

import com.project.domain.detail.Item;
import com.project.dto.AdminItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminItemRepository extends JpaRepository<Item,Long> {
    @Query("SELECT new com.project.dto.AdminItemDTO(" +
            "i.id,id.detailImage,id.itemCategory,id.itemName,id.itemPrice,i.color,i.size,i.itemCount,i.status,i.createdAt)" +
            "FROM Item i " +
            "JOIN i.itemDetail id " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput ='') OR " +
            " (:searchKeyword ='itemName' AND id.itemName LIKE CONCAT('%',:searchInput,'%'))) " +
            "AND (:category ='' OR id.itemCategory = :category)" +
            "AND (:startDate IS NULL OR i.createdAt >= :startDate)"+
            "AND (:endDate IS NULL OR i.createdAt <= :endDate)" +
            "AND (:minCount = 0 OR i.itemCount >= :minCount)" +
            "AND (:maxCount = 0 OR i.itemCount <= :maxCount)" +
            "AND (:status ='' OR i.status = :status )")
    Page<AdminItemDTO> findItem(Pageable pageable,
                                @Param("searchKeyword")String searchKeyword,
                                @Param("searchInput")String searchInput,
                                @Param("startDate")Timestamp startDate,
                                @Param("endDate")Timestamp endDate,
                                @Param("minCount")Integer minCount,
                                @Param("maxCount")Integer maxCount,
                                @Param("category")String category,
                                @Param("status")String status);
}
