package com.project.service;

import com.project.domain.detail.ItemInquiry;
import com.project.dto.ItemInquiryDTO;
import com.project.dto.UserItemInquiryDTO;
import com.project.repository.ItemInquiryRepository;
import com.project.repository.ItemRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemInquiryService {

    private final ItemInquiryRepository itemInquiryRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public List<UserItemInquiryDTO> findAll(Long itemId){return itemInquiryRepository.findByUserId(itemId);}
    public Long countInquiriesByItemId(Long itemId) {return itemInquiryRepository.countInquiriesByItemId(itemId);}

    public void saveInquiry(ItemInquiryDTO ItemInquiryDTO) {

        // DTO → 엔티티 변환
        ItemInquiry inquiry = new ItemInquiry();
        inquiry.setId(ItemInquiryDTO.getId());
        inquiry.setContent(ItemInquiryDTO.getContent());
        inquiry.setInquiryType(ItemInquiryDTO.getInquiryType());
        inquiry.setAnswerStatus(ItemInquiryDTO.getAnswerStatus());
        inquiry.setStatus(ItemInquiryDTO.getStatus());
        inquiry.setCreatedAt(ItemInquiryDTO.getCreatedAt());

        // 유저 설정
        inquiry.setUsers(userRepository.findById(ItemInquiryDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));

        inquiry.setItemDetail(itemRepository.findById(ItemInquiryDTO.getItemDetailId())
                .orElseThrow(() -> new RuntimeException("Item not found")));

        // 엔티티 저장
        itemInquiryRepository.save(inquiry);
    }

    public void deactivateInquiry(Long inquiryId) {
        ItemInquiry inquiry = itemInquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new IllegalStateException("Review not found"));

        // 상태를 'inactive'로 변경
        inquiry.setStatus(ItemInquiry.Status.inactive);

        itemInquiryRepository.save(inquiry);
    }

    public void activateInquiry(Long inquiryId) {
        ItemInquiry inquiry = itemInquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new IllegalStateException("Review not found"));

        // 상태를 'active'로 변경 (Enum 사용)
        inquiry.setStatus(ItemInquiry.Status.active);

        itemInquiryRepository.save(inquiry);
    }
}
