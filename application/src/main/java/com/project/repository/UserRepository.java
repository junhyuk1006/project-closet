package com.project.repository;

import com.project.dto.UserGradeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.domain.Users;


@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
  Users findByUsername(String username); // 사용자 이름으로 사용자 찾기
  Boolean existsByUsername(String username); // 사용자 이름 중복 여부 확인
  Boolean existsByNickname(String nickname); // 닉네임 중복 여부 확인
  Boolean existsByEmail(String email); // 이메일 중복 여부 확인

  Users findByUsernameAndPassword(String username, String password); // 사용자 이름과 비밀번호로 사용자 찾기


  Users findByNaverId(String providerId);
  Users findByKakaoId(String providerId);
  Users findByNickname(String nickname);

  // 회원 비밀번호 변경
  @Modifying
  @Query("Update Users u SET u.password = :encodedPwd WHERE u.id = :userId")
  void changePwd(@Param("userId") Long userId, @Param("encodedPwd") String encodedPwd);

  @Query("SELECT new com.project.dto.UserGradeDTO(g.grade, g.rate) " +
          "FROM Users u JOIN u.grade g WHERE u.id = :userId")
  UserGradeDTO findGradeByUserId(@Param("userId") Long userId);

}

