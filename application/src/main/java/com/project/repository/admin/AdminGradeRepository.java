package com.project.repository.admin;

import com.project.domain.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminGradeRepository extends JpaRepository<Grade,Long> {
}
