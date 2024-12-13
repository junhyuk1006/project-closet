package com.project.service;

import com.project.domain.Point;
import com.project.dto.PointDTO;
import com.project.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
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

    public List<PointDTO> findPointDTOsByUserId(long userId) {
        return pointRepository.findByUserId(userId);
    }

    public void save(Point point) {
        int retentionDays = POINT_RETENTION_DAYS.getOrDefault(point.getPointType(), 0);
        if (retentionDays > 0) {
            Timestamp createdAt = new Timestamp(System.currentTimeMillis());
            point.setDeletedAt(Timestamp.valueOf(createdAt.toLocalDateTime().plusDays(retentionDays)));
        }

        pointRepository.save(point);
    }

    public Map<String, Integer> getTotalPointByUserid(long userId) {
        // PointRepository에서 총 포인트 값을 가져와 JSON 형태로 반환
        int totalPoints = pointRepository.getTotalPointByUserId(userId);
        return Map.of("totalPoints", totalPoints); // JSON 형태로 감싸서 반환
    }
}


