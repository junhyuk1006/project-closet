    package com.project.repository;

    import com.project.domain.Point;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;
    import org.springframework.stereotype.Repository;

    import java.util.List;

    @Repository
    public interface PointRepository  extends JpaRepository<Point, Long> {

        @Query("SELECT p FROM Point p WHERE p.userId = :userId")
        List<Point> findByUserId(@Param("userId") long userId);

        @Query("SELECT SUM(CASE " +
                "WHEN p.pointType = '적립' THEN p.point " +
                "WHEN p.pointType = '차감' OR p.pointType = '만료' THEN -p.point " + // 공백 추가
                "END) " +
                "FROM Point p WHERE p.userId = :userId")
        int getTotalPointByUserId(@Param("userId") long userId);

        @Query(value = "SELECT SUM(p.point) FROM point p WHERE p.user_id = :userId AND p.deleted_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY)", nativeQuery = true)
        int getExpirePointByUserid(@Param("userId") long userId);


    }
