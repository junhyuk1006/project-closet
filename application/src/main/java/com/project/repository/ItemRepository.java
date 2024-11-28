package com.project.repository;

import com.project.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *  매퍼 (혹은 레포지토리) 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 매퍼 파일을 생성했다면 지우시면 됩니다.
 *
 *  참고) Mybatis 사용 시 Mapper, JPA 사용 시 Repository 객체명을 사용합니다.
 */

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // 기본적으로 findAll() 메서드 제공
}