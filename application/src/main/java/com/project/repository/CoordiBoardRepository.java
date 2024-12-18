package com.project.repository;

import com.project.domain.CoordiBoard;
import com.project.dto.CoordiBoardDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CoordiBoardRepository extends JpaRepository<CoordiBoard, Long> {

    @Query("SELECT new com.project.dto.CoordiBoardDTO(c.id, c.user.id, c.coordiTitle, c.coordiContent, c.coordiImage, u.nickname) " +
            "FROM CoordiBoard c JOIN c.user u")
    List<CoordiBoardDTO> findAllCoordiBoardDTO();


    @Query("SELECT new com.project.dto.CoordiBoardDTO(c.id, c.user.id, c.coordiTitle, c.coordiContent, c.coordiImage, u.nickname) " +
            "FROM CoordiBoard c JOIN c.user u")
    CoordiBoardDTO findCoordiBoardDTOById(@Param("id") Long id);
}
