package com.project.repository.admin;

import com.project.domain.Users;
import com.project.dto.AdminUserDTO;
import com.project.dto.PageRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUserRepository extends JpaRepository<Users, Long> {
    @Query("SELECT new com.project.dto.AdminUserDTO( " +
            "u.id, u.username, u.nickname, g.grade, u.birth, " +
            "(SELECT COALESCE(SUM(p.point), 0) FROM Point p WHERE p.user.id = u.id), " +
            "(SELECT COUNT(o) FROM OrderList o WHERE o.user.id = u.id), " +
            "u.status, u.createdAt) " +
            "FROM Users u " +
            "LEFT JOIN u.grade g")
    Page<AdminUserDTO> findAllAdminUsers(Pageable pageable, PageRequestDTO pageRequestDTO);
}
