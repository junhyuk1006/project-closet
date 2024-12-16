    package com.project.repository;

    import com.project.domain.Point;
    import com.project.dto.PointDTO;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface PointRepository  extends JpaRepository<Point, Long> {

        @Query("SELECT new com.project.dto.PointDTO(p.id, p.user.id, p.point, p.pointReason, p.pointType, p.createdAt, p.deletedAt, p.status) " +
                "FROM Point p WHERE p.user.id = :userId ORDER BY p.createdAt DESC")
        Page<PointDTO> findByUserId(long userId, Pageable pageable);


        @Query("SELECT SUM(CASE " +
                "WHEN p.pointType = '적립' THEN p.point " +
                "WHEN p.pointType = '차감' OR p.pointType = '만료' THEN -p.point " + // 공백 추가
                "END) " +
                "FROM Point p WHERE p.user.id = :userId")
       int getTotalPointByUserId(long userId);



    }
