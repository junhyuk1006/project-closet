package com.project.service;

import com.project.domain.Basket;
import com.project.dto.BasketItemDTO;
import com.project.repository.BasketRepository;
import com.project.repository.ItemRepository;
import com.project.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class BasketService {
    private final BasketRepository basketRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public void saveBasket(BasketItemDTO basketItemDTO) {

        // DTO → 엔티티 변환
        Basket basket = new Basket();
        basket.setId(basketItemDTO.getBasketId());
        basket.setItemCount(basketItemDTO.getItemCount());
        basket.setSize(basketItemDTO.getSize());
        basket.setColor(basketItemDTO.getColor());

        basket.setUsers(userRepository.findById(basketItemDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));

        basket.setItemDetail(itemRepository.findById(basketItemDTO.getItemDetailId())
                .orElseThrow(() -> new RuntimeException("ItemDetail not found")));

        basketRepository.save(basket);
    }

    public List<BasketItemDTO> getBasket(Long userId) {return basketRepository.findByUserId(userId);}

    public void removeBasketItem(Long id) {
        if (!basketRepository.existsById(id)) {
            throw new NoSuchElementException("Basket item not found with id: " + id);
        }
        basketRepository.deleteById(id);
    }

    @Transactional
    public boolean updateBasketStatus(List<Long> basketIds, String status) {
        // basketIds가 비어있거나 status가 없으면 false 반환할 수도 있음. 필요 시 검증 로직 추가
        int updatedCount = basketRepository.updateStatusForBaskets(basketIds, status);
        // updatedCount가 basketIds 크기와 같다면 모든 항목 업데이트 성공으로 간주
        return updatedCount == basketIds.size();
    }
}
