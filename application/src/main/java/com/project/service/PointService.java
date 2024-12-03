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


    public List<Point> getAllPoint() {
        return pointRepository.findAll();
    }
}
