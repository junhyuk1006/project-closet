package com.project.repository.admin;

import com.project.domain.User;
import com.project.dto.AdminUserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminUserRepository extends JpaRepository<User, Long> {
    @Query("SELECT new com.project.dto.AdminUserDTO( " +
            "u.id, u.username, u.nickname, g.grade, u.birth, " +
            "(SELECT COALESCE(SUM(p.point), 0) FROM Point p WHERE p.user.id = u.id), " +
            "(SELECT COUNT(o) FROM OrderList o WHERE o.user.id = u.id), " +
            "u.status, u.createdAt) " +
            "FROM User u " +
            "LEFT JOIN u.grade g")
    List<AdminUserDTO> findAllAdminUsers();
}
