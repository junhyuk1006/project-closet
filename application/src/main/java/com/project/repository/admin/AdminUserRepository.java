package com.project.repository.admin;

import com.project.domain.Users;
import com.project.dto.AdminUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminUserRepository extends JpaRepository<Users, Long> {
  }
