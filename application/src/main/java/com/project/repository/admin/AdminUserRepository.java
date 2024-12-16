package com.project.repository.admin;

import com.project.domain.Users;
import com.project.dto.AdminUserDTO;
import com.project.dto.AdminUserMonthDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AdminUserRepository extends JpaRepository<Users, Long> {
    @Query("SELECT new com.project.dto.AdminUserDTO( " +
            "u.id,u.email, u.nickname, g.grade, u.birth, " +
            "(SELECT COALESCE(SUM(p.point), 0) FROM Point p WHERE p.user.id = u.id), " +
            "(SELECT COUNT(o) FROM OrderHistory o WHERE o.user.id = u.id), " +
            "u.status, u.createdAt) " +
            "FROM Users u " +
            "LEFT JOIN u.grade g " +
            "WHERE ((:searchKeyword IS NULL OR :searchInput ='') OR " +
            " (:searchKeyword ='nickname' AND u.nickname LIKE CONCAT('%',:searchInput,'%')) OR" +
            " (:searchKeyword ='email' AND u.email LIKE CONCAT('%',:searchInput,'%')))" +
            "AND (:grade ='' OR g.grade = :grade)" +
            "AND (:startDate IS NULL OR u.createdAt >= :startDate)"+
            "AND (:endDate IS NULL OR u.createdAt <= :endDate)")
    Page<AdminUserDTO> findAllAdminUsers(Pageable pageable,
                                         @Param("searchKeyword") String searchKeyword,
                                         @Param("searchInput") String searchInput,
                                         @Param("startDate") Timestamp startDate,
                                         @Param("endDate") Timestamp endDate,
                                         @Param("grade") String grade);

    @Query("SELECT new com.project.dto.AdminUserMonthDTO(" +
            "YEAR(u.createdAt), MONTH(u.createdAt), COUNT(u)) " +
            "FROM Users u " +
            "WHERE u.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY YEAR(u.createdAt), MONTH(u.createdAt) " +
            "ORDER BY YEAR(u.createdAt) ASC, MONTH(u.createdAt) ASC")
    List<AdminUserMonthDTO> findUserMonth(@Param("startDate") LocalDateTime startDate , @Param("endDate")LocalDateTime endDate);


    @Query("SELECT COUNT(u) "+
            "FROM Users u " +
            "WHERE (:startDate IS NULL OR :endDate IS NULL) OR " +
            "u.createdAt BETWEEN :startDate AND :endDate")
    int findUserDate(@Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);
}
