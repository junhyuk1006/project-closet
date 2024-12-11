package com.project.controller.detail;

import com.project.domain.detail.ItemInquiry;
import com.project.dto.ItemInquiryDTO;
import com.project.dto.UserItemInquiryDTO;
import com.project.service.ItemInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor // 생성자
public class InquiryController {

    private final ItemInquiryService itemInquiryService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/saveInquiry")
    public ResponseEntity<Map<String, String>> saveInquiry(@RequestBody ItemInquiryDTO ItemInquiryDTO) {
        itemInquiryService.saveInquiry(ItemInquiryDTO);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Inquiry saved successfully.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getCountInquiries/{itemId}")
    public Long getCountInquiries(@PathVariable Long itemId){return itemInquiryService.countInquiriesByItemId(itemId);}

    @GetMapping("/getInquiries/{itemId}")
    public ResponseEntity<List<UserItemInquiryDTO>> getInquiries(@PathVariable("itemId") Long itemId) {
        List<UserItemInquiryDTO> inquiries = itemInquiryService.findAll(itemId);
        return ResponseEntity.ok(inquiries); // JSON 형식으로 반환
    }

    @PatchMapping("/deactivateInquiry/{inquiryId}")
    public ResponseEntity<String> deactivateInquiry(@PathVariable Long inquiryId) {
        itemInquiryService.deactivateInquiry(inquiryId);
        return ResponseEntity.ok("상품 문의 비활성화가 완료 되었습니다");
    }

    @PatchMapping("/activateInquiry/{inquiryId}")
    public ResponseEntity<String> activateInquiry(@PathVariable Long inquiryId) {
        itemInquiryService.activateInquiry(inquiryId);
        return ResponseEntity.ok("상품 문의 활성화가 완료 되었습니다");
    }
}
