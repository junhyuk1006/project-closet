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

    @Value("${naverpay.base-api-url}")
    private String baseApiUrl;

    private final RestTemplate restTemplate; // RestTemplate를 빈으로 주입받습니다.

    public boolean approvePayment(String merchantPayKey, String paymentId) {
        // 샌드박스 API 베이스 URL 설정 (문서에 나오는 정확한 URL로 교체 필요)
        String apiUrl = "https://dev-pub.apis.naver.com/naverpay-partner/naverpay/payments/v2.2/apply/payment";
        // 승인 API 경로 추가

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Naver-Client-Id", "HN3GGCMDdTgGUfl0kFCo");
        headers.set("X-Naver-Client-Secret", "dk5nR1JxcmM2MU1");

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("merchantPayKey", merchantPayKey);
        requestBody.put("paymentId", paymentId);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            logger.info("네이버페이 승인 요청 URL: {}", apiUrl);
            logger.info("네이버페이 승인 요청 바디: {}", requestBody);

            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, Map.class);

            logger.info("네이버페이 승인 응답: {}", response.getBody());

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