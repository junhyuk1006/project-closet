package com.project.service;

import com.project.domain.Address;
import com.project.domain.Reservation;
import com.project.dto.*;
import com.project.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class MypageService {

    private final AddressRepository addressRepository;
    private final ItemInquiryRepository itemInquiryRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final Path profileImageDir = Paths.get("C:/closetImage/profile/");
    private final StylingRepository stylingRepository;

    // userId로 등록된 배송지 조회( 대표 배송지 + 일반 배송지)
    public List<Address> findByUserId(@RequestParam("userId") long userId) {
        return addressRepository.findByUserId(userId);
    }

    // address의 id 정보값으로 주소값 삭제
    public void deleteById(@PathVariable("id") long id) {
        addressRepository.deleteById(id);
    }

    // 대표 주소지 변경
    public void switchRepresentativeAddress(long addressId, long userId) {
        addressRepository.switchRepresentativeAddress(addressId, userId);
    }

    // 문의내역 조회
    public Page<UserItemInquiryDTO> getInquiriesByUser(Long userId, Pageable pageable) {
        return itemInquiryRepository.findByUsers_Id(userId, pageable);
    }

    // 리뷰 내역 조회
    public Page<UserItemReviewDTO> getMyReviews(Long userId, Pageable pageable) {
        return reviewRepository.getMyReviews(userId, pageable);
    }


    // 프로필 이미지 저장
    public String saveProfileImage(MultipartFile file, Long userId) throws IOException {
        // 외부 저장 경로를 Path로 설정
        Path uploadDir = Paths.get("C:/closetImage/profile/");

        // 디렉토리 생성
        Files.createDirectories(uploadDir);

        // 기존 프로필 이미지 삭제
        deleteExistingProfileImage(userId, uploadDir);

        // 새 파일 이름 생성 (특수문자 제거 포함)
        String newFileName = generateFileName(file.getOriginalFilename());

        // 파일 저장 경로
        Path filePath = uploadDir.resolve(newFileName); // uploadDir/newFileName

        // 파일 저장
        file.transferTo(filePath.toFile());

        return newFileName; // 새로 생성된 파일 이름 반환
    }

    // 사용자 프로필 이미지 업데이트
    public void updateProfileImage(Long userId, String newFileName) {
        // 사용자 정보 조회 및 업데이트
        userRepository.findById(userId).ifPresent(user -> {
            user.setProfileImage(newFileName); // 새 파일 이름으로 프로필 이미지 업데이트
            userRepository.save(user);        // 변경 사항 저장
        });
    }

    // 기존 프로필 이미지 삭제
    private void deleteExistingProfileImage(Long userId, Path uploadDir) {
        userRepository.findById(userId).ifPresent(user -> {
            String currentProfileImage = user.getProfileImage();

            // 기존 이미지 파일 삭제
            if (currentProfileImage != null && !currentProfileImage.equals("basic-image.png")) {
                Path filePath = uploadDir.resolve(currentProfileImage);
                try {
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    // 로그 출력 또는 예외 처리
                    System.err.println("기존 파일 삭제 실패: " + filePath);
                }
            }
        });
    }

    // 파일 이름 생성 로직
    private String generateFileName(String originalName) {
        // 특수문자 제거 및 기본 파일 이름 정리
        String sanitized = originalName.replaceAll("[^a-zA-Z0-9.]", "_"); // 특수문자 제거 및 _로 대체

        // 확장자 추출
        String ext = sanitized.substring(sanitized.lastIndexOf(".")); // 확장자
        String baseName = sanitized.substring(0, sanitized.lastIndexOf(".")); // 이름 부분

        // 날짜 + 난수 조합으로 새 이름 생성
        String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        int random = new Random().nextInt(10000); // 난수 생성

        return baseName + "_" + timestamp + "_" + random + ext; // 최종 이름
    }

    public Path getProfileImagePath(String fileName) {

        return profileImageDir.resolve(fileName);
    }

    // 주소지 등록
    public void updateAddressByUserId(Long userId, Address address) {
        // 1. 주소 개수 확인 (기존 주소가 3개 이상이면 예외 처리)
        int addressCount = addressRepository.addresscountByUserId(userId); // 주소 개수 확인
        if (addressCount >= 3) {
            throw new RuntimeException("배송지는 최대 3개까지 등록할 수 있습니다. 기존 주소지를 삭제해주세요.");
        }

        // 2. 기존 주소 목록 조회
        List<Address> existingAddresses = addressRepository.findByUserId(userId);

        // 3. 기존 주소 중 대표 주소가 없다면, 새 주소를 대표 주소로 설정
        if (existingAddresses.stream().noneMatch(a -> a.isRepresent() == true)) {
            address.setRepresent(true);// 대표 주소로 설정
        } else {
            address.setRepresent(false); // 대표 주소가 이미 있으면 일반 주소로 설정
        }

        // 4. 새로운 주소 등록
        // Address 엔티티에 userId를 설정
        address.setUserId(userId);

        // Address 엔티티를 JPA 리포지토리를 통해 저장
        addressRepository.save(address);
    }


    public List<UserReservationDTO> getReservationsByUserId(Long userId) {

            // 예약 리스트 조회
            List<Reservation> reservations = stylingRepository.findAllByUserId(userId);

            // DTO로 변환
            return reservations.stream()
                    .map(reservation -> UserReservationDTO.builder()
                            .userId(reservation.getUser().getId()) // 예약한 사용자 ID
                            .reservationId(reservation.getId()) // 예약 ID
                            .coordiId(reservation.getCoordi() != null ? reservation.getCoordi().getId() : null) // 코디네이터 ID
                            .nickname(reservation.getCoordi() != null ? reservation.getCoordi().getNickname() : null) // 코디네이터 닉네임
                            .reservationDate(reservation.getReservationDate()) // 예약 날짜
                            .reservationStatus(reservation.getReservationStatus()) // 예약 상태
                            .build())
                    .toList();
        }



}

