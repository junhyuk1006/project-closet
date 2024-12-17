package com.project.repository;

import com.project.domain.Point;
import com.project.dto.PointDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository  extends JpaRepository<Point, Long> {

    /** DTO 에 TotalPoint 추가시, 여기에도 추가를 해야 했었음
     * 현재는 완벽하게 분리하여 상관 없음 */
    @Query("SELECT new com.project.dto.PointDTO(" +
            "p.id, u.id, p.point, p.pointReason, p.pointType, " +
            "p.pointInsertType, p.createdAt, p.deletedAt, p.status) " +
            "FROM Point p " +
            "Join p.user u " +
            "WHERE p.user.id = :userId")
    Page<PointDTO> findByUserId(long userId, Pageable pageable);

    /** 이전 쿼리문과 기능은 같으나 가독성을 향상시킴 */
    @Query("""
                SELECT SUM(
                    CASE 
                        WHEN p.pointType = '적립' THEN p.point
                        WHEN p.pointType IN ('차감', '만료') THEN (0 - p.point)
                        ELSE 0
                    END
                )
                FROM Point p 
                WHERE p.user.id = :userId
            """)
    int getTotalPointByUserId(long userId);

}