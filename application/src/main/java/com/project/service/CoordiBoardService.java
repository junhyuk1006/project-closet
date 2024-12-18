package com.project.service;

import com.project.domain.CoordiBoard;
import com.project.domain.Users;
import com.project.dto.CoordiBoardDTO;
import com.project.repository.CoordiBoardRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoordiBoardService {

    private static final String FRONTEND_IMAGES_PATH =
            System.getProperty("user.dir") + "/../frontend/public/images";

    private final CoordiBoardRepository coordiBoardRepository;
    private final UserRepository userRepository;
    private final FileService fileService;

    // 코디 저장
    public CoordiBoardDTO saveCoordi(MultipartFile image, String description, Long userId, String title) throws IOException {
        // 파일 업로드 로직
        String fileName = fileService.uploadFile(image, FRONTEND_IMAGES_PATH);

        // 사용자 조회
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자 ID입니다."));

        // CoordiBoard 엔티티 저장
        CoordiBoard coordiBoard = new CoordiBoard();
        coordiBoard.setUser(user); // user 객체 설정
        coordiBoard.setCoordiTitle(title);
        coordiBoard.setCoordiContent(description);
        coordiBoard.setCoordiImage(fileName);

        CoordiBoard savedCoordi = coordiBoardRepository.save(coordiBoard);

        return new CoordiBoardDTO(
                savedCoordi.getId(),
                savedCoordi.getUser().getId(),
                savedCoordi.getCoordiTitle(),
                savedCoordi.getCoordiContent(),
                savedCoordi.getCoordiImage(),
                user.getNickname()
        );
    }

    // 코디 목록 조회 (DTO 반환)
    public List<CoordiBoardDTO> getAllCoordis() {
        List<CoordiBoard> boards = coordiBoardRepository.findAll();
        return boards.stream()
                .map(board -> new CoordiBoardDTO(
                        board.getId(),
                        board.getUser().getId(),          // userId 가져오기
                        board.getCoordiTitle(),
                        board.getCoordiContent(),
                        board.getCoordiImage(),
                        board.getUser().getNickname()     // 작성자 닉네임
                ))
                .collect(Collectors.toList());
    }

    // 특정 코디 조회 (DTO 반환)
    public CoordiBoardDTO getCoordiById(Long id) {
        CoordiBoard board = coordiBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("CoordiBoard not found"));

        return new CoordiBoardDTO(
                board.getId(),
                board.getUser().getId(),
                board.getCoordiTitle(),
                board.getCoordiContent(),
                board.getCoordiImage(),
                board.getUser().getNickname()
        );
    }

    // 코디 수정 (DTO 반환)
    public CoordiBoardDTO updateCoordi(Long id, MultipartFile image, String description, String title) throws IOException {
        CoordiBoard coordiBoard = coordiBoardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("CoordiBoard not found"));

        if (image != null) {
            // 이미지 업데이트
            String fileName = fileService.uploadFile(image, FRONTEND_IMAGES_PATH);
            coordiBoard.setCoordiImage(fileName);
        }

        coordiBoard.setCoordiContent(description);
        coordiBoard.setCoordiTitle(title);

        CoordiBoard updatedCoordi = coordiBoardRepository.save(coordiBoard);

        return new CoordiBoardDTO(
                updatedCoordi.getId(),
                updatedCoordi.getUser().getId(),
                updatedCoordi.getCoordiTitle(),
                updatedCoordi.getCoordiContent(),
                updatedCoordi.getCoordiImage(),
                updatedCoordi.getUser().getNickname()
        );
    }

    // 코디 삭제
    public boolean deleteCoordi(Long id) {
        CoordiBoard coordiBoard = coordiBoardRepository.findById(id).orElse(null);
        if (coordiBoard == null) {
            return false;
        }
        coordiBoardRepository.deleteById(id);
        return true;
    }
}
