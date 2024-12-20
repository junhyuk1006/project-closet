package com.project.repository;

import com.project.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StylingRepository extends JpaRepository<Reservation, Long> {


    @Query("SELECT r FROM Reservation r " +
            "JOIN FETCH r.user u " + // 예약한 사용자와 조인
            "LEFT JOIN FETCH r.coordi c " + // 코디네이터와 조인 (LEFT JOIN은 null 값도 허용)
            "WHERE u.id = :userId")
    List<Reservation> findAllByUserId(@Param("userId") Long userId);


}
