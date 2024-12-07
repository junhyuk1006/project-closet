package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.domain.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
  Users findByUsername(String username); // 사용자 이름으로 사용자 찾기
  Boolean existsByUsername(String username); // 사용자 이름 중복 여부 확인
  Users findByUsernameAndPassword(String username, String password); // 사용자 이름과 비밀번호로 사용자 찾기
  Optional<Users> findById(Long id);
}



