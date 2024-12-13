package com.project.service;

import com.project.domain.CoordiBoard;
import com.project.repository.CoordiBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
}