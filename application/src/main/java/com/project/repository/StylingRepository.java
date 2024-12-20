package com.project.repository;

import com.project.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

@Repository
public interface StylingRepository extends JpaRepository<Reservation, Long> {


    @GetMapping("/")

}
