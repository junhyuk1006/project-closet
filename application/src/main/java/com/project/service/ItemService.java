package com.project.service;

import com.project.dto.ItemAllDTO;
import com.project.dto.ItemDetailItemDTO;
import com.project.repository.ItemDetailRepository;
import com.project.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 *  서비스 객체가 생성될 디렉토리입니다.
 *  테스트 파일이며, 서비스 파일을 생성했다면 지우시면 됩니다.
 *  기능 관련 코드는 최대한 service 객체에 작성하는 게 좋습니다.
 */

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemDetailRepository itemDetailRepository;

    public List<ItemAllDTO> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(item -> new ItemAllDTO(
                        item.getId(),
                        item.getItem_name(),
                        item.getItem_category(),
                        item.getItem_price(),
                        item.getMain_image(),
                        item.getDetail_image(),
                        item.getViews(),
                        item.getStatus()
                ))
                .collect(Collectors.toList());
    }

    public List<ItemDetailItemDTO> getItemsByItemDetailId(Long itemDetailId) {
        System.out.print("asdasdasd" + itemDetailRepository.findItemDetailWithItem(itemDetailId));
        return itemDetailRepository.findItemDetailWithItem(itemDetailId);
    }

    // 상위 3개의 아이템을 category(조회수, 좋아요 순위 등)로 조회하는 메서드
    public List<ItemAllDTO> getTop3ItemsByCategory(String category) {
        // jpa의 페이지네이션 내장 객체로 페이징 처리, 정렬 처리
        Pageable pageable = PageRequest.of(0, 3, Sort.by(Sort.Direction.DESC, category));
        Page<ItemAllDTO> top3Item = itemRepository.findAllByStatusActive(pageable);

        return top3Item.getContent();
    }
}
