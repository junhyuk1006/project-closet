package com.project.service;

import com.project.domain.Point;
import com.project.repository.PointRepository;
import io.jsonwebtoken.lang.Maps;
import lombok.RequiredArgsConstructor;
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

    public List<Point> findAll() {
        return pointRepository.findAll();
    }

    public void save(Point point) {
        int retentionDays = POINT_RETENTION_DAYS.getOrDefault(point.getPointType(),0);
        if (retentionDays >0) {
            Timestamp createdAt = new Timestamp(System.currentTimeMillis());
            point.setDeletedAt(Timestamp.valueOf(createdAt.toLocalDateTime().plusDays(retentionDays)));
        }

        pointRepository.save(point);
    }

    public List<Point> findByUserId(Long userId) {
        return pointRepository.findByUserId(userId);
    }

    public int getTotalPointByUserid(long userId) {
        return pointRepository.getTotalPointByUserId(userId);
    }

    public int getExpirePointByUserid(long userId) {
        return pointRepository.getExpirePointByUserid(userId);
    }
}
