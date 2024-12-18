package com.project.repository;

import com.project.domain.CoordiBoard;
import com.project.dto.CoordiBoardDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CoordiBoardRepository extends JpaRepository<CoordiBoard, Long> {

    @Query("SELECT new com.project.dto.CoordiBoardDTO(c.id, c.user.id, c.coordiTitle, c.coordiContent, c.coordiImage, c.user.nickname) " +
            "FROM CoordiBoard c")
    List<CoordiBoardDTO> findAllCoordiBoardDTO();


}
