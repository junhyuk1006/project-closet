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


    }
