package com.project.service;

import com.project.domain.CoordiBoard;
import com.project.repository.CoordiBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CoordiBoardService {

    final CoordiBoardRepository coordiBoardRepository;
    final FileService fileService;

    public void saveCoordi(MultipartFile image, String description, Long userId, String title) throws IOException {
        // 파일 업로드 로직 위임
        String directoryPath = "src/main/resources/static/images";
        String fileName = fileService.uploadFile(image, directoryPath);

        // CoordiBoard 엔티티 저장
        CoordiBoard coordiBoard = new CoordiBoard();
        coordiBoard.setUserId(userId);
        coordiBoard.setCoordiTitle(title);
        coordiBoard.setCoordiContent(description);
        coordiBoard.setCoordiImage(fileName); // 저장된 파일 이름 설정

        coordiBoardRepository.save(coordiBoard);
    }

    // 코디 목록 조회
    public List<CoordiBoard> getAllCoordis() {
        return coordiBoardRepository.findAll();
    }

    // 특정 코디 조회
    public CoordiBoard getCoordiById(Long id) {
        return coordiBoardRepository.findById(id).orElse(null);
    }

    // 코디 수정
    public void updateCoordi(Long id, MultipartFile image, String description, String title) throws IOException {
        CoordiBoard coordiBoard = coordiBoardRepository.findById(id).orElse(null);
        if (coordiBoard == null) {
            throw new IllegalArgumentException("CoordiBoard not found");
        }

        if (image != null) {
            String directoryPath = "src/main/resources/static/images";
            String fileName = fileService.uploadFile(image, directoryPath);
            coordiBoard.setCoordiImage(fileName);
        }

        coordiBoard.setCoordiContent(description);
        coordiBoard.setCoordiTitle(title);
        coordiBoardRepository.save(coordiBoard);
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