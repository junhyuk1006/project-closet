package com.project.service;

import com.project.domain.Point;
import com.project.dto.PointDTO;
import com.project.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

    public Page<PointDTO> findPointDTOsByUserId(long userId, Pageable pageable) {
        return pointRepository.findByUserId(userId, pageable);
    }


    public void save(Point point) {
        int retentionDays = POINT_RETENTION_DAYS.getOrDefault(point.getPointType(), 0);
        if (retentionDays > 0) {
            Timestamp createdAt = new Timestamp(System.currentTimeMillis());
            point.setDeletedAt(Timestamp.valueOf(createdAt.toLocalDateTime().plusDays(retentionDays)));
        }

        pointRepository.save(point);
    }

    public PointDTO getTotalPointByUserId(long userId) {
        int totalPoint = pointRepository.getTotalPointByUserId(userId);

        // DTO 생성 및 값 설정
        PointDTO dto = new PointDTO();
        dto.setTotalUserPoint(totalPoint);
        return dto;
    }
}


