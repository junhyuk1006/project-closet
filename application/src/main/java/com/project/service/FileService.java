package com.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {

    public String uploadFile(MultipartFile file, String directoryPath) throws IOException {
        String staticImagePath = new File(directoryPath).getAbsolutePath();
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String filePath = staticImagePath + File.separator + fileName;

        File directory = new File(staticImagePath);
        if (!directory.exists()) {
            directory.mkdirs(); // 디렉토리 생성
        }

        File targetFile = new File(filePath);
        file.transferTo(targetFile); // 파일 저장

        return fileName; // 저장된 파일 이름 반환
    }
}
