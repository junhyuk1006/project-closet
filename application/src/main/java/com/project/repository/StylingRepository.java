package com.project.repository;

import com.project.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StylingRepository extends JpaRepository<Reservation, Long> {
}
