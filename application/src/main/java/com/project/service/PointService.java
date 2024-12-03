package com.project.service;

import com.project.domain.Point;
import com.project.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    public List<Point> findAll() {
        return pointRepository.findAll();
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
