package com.project.service;

import com.project.domain.Test;
import com.project.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 *  서비스 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 서비스 파일을 생성했다면 지우시면 됩니다.
 *  기능 관련 코드는 최대한 service 객체에 작성하는 게 좋습니다.
 */

@Service
@RequiredArgsConstructor  // Autowired 사용 x
public class TestService {
    private final TestRepository testRepository;

    public Test test() {
        testRepository.save(new Test());  // JPA에 의해 자동생성된 insert 쿼리문
        return new Test();
    }
}
