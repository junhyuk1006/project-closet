package com.project.repository;

import com.project.domain.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *  매퍼 (혹은 레포지토리) 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 매퍼 파일을 생성했다면 지우시면 됩니다.
 *
 *  참고) Mybatis 사용 시 Mapper, JPA 사용 시 Repository 객체명을 사용합니다.
 */

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    /**
     *  기본적인 CRUD 쿼리문은 JPA에 의해 제공됩니다.
     *  즉 간단한 insert, delete문 등은 작성하지 않아도 service 객체에서 사용할 수 있습니다.
     */
}
