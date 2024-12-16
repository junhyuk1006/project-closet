package com.project.service;

import com.project.domain.Point;
import com.project.dto.PointDTO;
import com.project.repository.PointRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    private static final Map<String, Integer> POINT_RETENTION_DAYS = Map.of(
            "normal_review", 7,
            "signUp", 30
            //  원하는 지급 이력 추가 가능
    );

    public void save(PointDTO pointDTO) {
        // Point 객체 생성 및 필드 설정
        Point point = new Point();
        point.setStatus(pointDTO.getStatus() != null ? pointDTO.getStatus() : "active"); // 기본값 "active"
        point.setPoint(pointDTO.getPoint());
        point.setPointReason(pointDTO.getPointReason());
        point.setPointInsertType(pointDTO.getPointInsertType());
        point.setPointType(pointDTO.getPointType());

        // 생성 시간 설정
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        point.setCreatedAt(createdAt);

        // POINT_RETENTION_DAYS를 사용하여 deletedAt 계산
        String insetType = pointDTO.getPointInsertType();
        int retentionDays = POINT_RETENTION_DAYS.getOrDefault(insetType, 0);
        if (retentionDays > 0) {
            point.setDeletedAt(Timestamp.valueOf(createdAt.toLocalDateTime().plusDays(retentionDays)));
        }

        // User 정보 설정
        point.setUser(userRepository.findById(pointDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));

        // Point 엔티티 저장
        pointRepository.save(point);
    }

    private final UserRepository userRepository;

    public Page<PointDTO> findPointDTOsByUserId(long userId, Pageable pageable) {
        return pointRepository.findByUserId(userId, pageable);
    }

    public int getTotalPointByUserId(long userId) {
        return pointRepository.getTotalPointByUserId(userId);
    }
}
