package com.project.service;

import com.project.domain.Reservation;
import com.project.domain.Users;
import com.project.dto.ReservationDTO;
import com.project.repository.StylingRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StylingService {
    private final StylingRepository stylingRepository;
    private final UserRepository userRepository;

    public String insertReservation(ReservationDTO reservationDTO) {
        try {
            log.info("reservationDTO: {}", reservationDTO);

            // DTO의 데이터를 entity 매핑
            Reservation reservation = new Reservation();

            Users user = userRepository.findById(reservationDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("id에 해당하는 유저가 존재하지 않습니다."));
            reservation.setUser(user);

            Users coordi = userRepository.findById(reservationDTO.getCoordiId())
                    .orElseThrow(() -> new RuntimeException("id에 해당하는 코디네이터가 존재하지 않습니다."));
            reservation.setCoordi(coordi);

            /**
             *  코디예약 패널에서 보이는 시간 데이터는 시간대를 고려할 필요가 없기 때문에 LocalDateTime을 사용해야 합니다.
             *  또한 LocalDateTime -> Timestamp 변환이 간편하기 때문에 시간 데이터의 타입은 LocalDateTime을 주로 사용합니다.
             *
             *  1. ISO 8601 형식 데이터의 timezone 제거
             *  2. LocalDateTime 타입으로 변환
             *  3. Timestamp 타입으로 변환
             *  4. entity 저장
             */
            String isoDate = reservationDTO.getReservationDate().replace("Z", "");
            LocalDateTime localDateTime = LocalDateTime.parse(isoDate, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS"));
            Timestamp reservationDate = Timestamp.valueOf(localDateTime);
            reservation.setReservationDate(reservationDate);

            log.info("reservation: {}", reservation);

            stylingRepository.save(reservation);
            return "success";
        } catch (Exception e) {
            log.error(e.getMessage());
            return e.getMessage();
        }
    }
}
