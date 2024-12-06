package com.project.repository.admin;

import com.project.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends JpaRepository<User, Long> {
}
