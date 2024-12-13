package com.project.repository;

import com.project.domain.CoordiBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoordiBoardRepository extends JpaRepository<CoordiBoard, Long> {
}
