package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.domain.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
  Users findByUsername(String username); // 사용자 이름으로 사용자 찾기
  Boolean existsByUsername(String username); // 사용자 이름 중복 여부 확인
  Users findByUsernameAndPassword(String username, String password); // 사용자 이름과 비밀번호로 사용자 찾기

  Users findByNaverId(String providerId);
  Users findByKakaoId(String providerId);
  Users findByNickname(String nickname);

  // 회원 비밀번호 변경
  @Modifying
  @Query("Update Users u SET u.password = :encodedPwd WHERE u.id = :userId")
  void changePwd(@Param("userId") Long userId, @Param("encodedPwd") String encodedPwd);

  // 회원 신체 정보 수정
  @Modifying
  @Query("UPDATE Users u SET u.height = :newHeight, u.weight = :newWeight, u.size = :newSize, u.isReleased = :newIsReleased WHERE u.id = :userId")
  void changeBodyInfo(@Param("userId") Long userId,
                      @Param("newHeight") int newHeight,
                      @Param("newWeight") int newWeight,
                      @Param("newSize") String newSize,
                      @Param("newIsReleased") boolean newIsReleased);
  
  // 회원 추가 정보 수정
  @Modifying
  @Query("UPDATE Users u SET u.profileImage = :profileImage, u.name = :name, u.phone = :phone, u.style = :style, u.introduction = :introduction WHERE u.id = :userId")
  void changeAddInfo(@Param("userId") Long userId,@Param("profileImage") String profileImage, @Param("name") String name, @Param("phone") String phone, @Param("style") String style,@Param("introduction") String introduction);
}

