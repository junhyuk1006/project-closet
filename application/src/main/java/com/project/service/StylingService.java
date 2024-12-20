package com.project.service;

import com.project.domain.Reservation;
import com.project.repository.StylingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StylingService {
    private final StylingRepository stylingRepository;

    public String bookStyling(Reservation reservation) {
        try {
            stylingRepository.save(reservation);
            return "success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
