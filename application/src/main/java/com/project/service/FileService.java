package com.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {

    public String uploadFile(MultipartFile file, String directoryPath) throws IOException {
        // 디렉토리 생성
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 파일 이름 설정 (고유 이름 생성)
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File destinationFile = new File(directoryPath + "/" + fileName);

        // 파일 저장
        file.transferTo(destinationFile);

        return fileName; // 저장된 파일 이름 반환
    }
}