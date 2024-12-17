package com.project.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NaverPayService {

    private static final Logger logger = LoggerFactory.getLogger(NaverPayService.class);

    @Value("${naverpay.client-id}")
    private String clientId;

    @Value("${naverpay.client-secret}")
    private String clientSecret;

    @Value("${naverpay.base-api-url}")
    private String baseApiUrl;

    private final RestTemplate restTemplate; // RestTemplate를 빈으로 주입받습니다.

    public boolean approvePayment(String merchantPayKey) {
        // API 엔드포인트 설정 (승인 URL)
        String apiUrl = baseApiUrl + "/payments/v1/payments/approve";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);

        // 요청 바디 설정
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("merchantPayKey", merchantPayKey);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            // 네이버페이 API 호출
            logger.info("네이버페이 승인 요청: {}", requestBody);
            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, Map.class);

            // 응답 로깅
            logger.info("네이버페이 승인 응답: {}", response.getBody());

            // 응답 처리
            if (response.getStatusCode() == HttpStatus.OK) {
                String code = (String) response.getBody().get("code");
                if ("SUCCESS".equalsIgnoreCase(code)) {
                    logger.info("결제 승인 성공");
                    return true;
                }
            }
            logger.warn("결제 승인 실패: {}", response.getBody());
            return false;

        } catch (Exception e) {
            logger.error("결제 승인 중 오류 발생: ", e);
            return false;
        }
    }
}