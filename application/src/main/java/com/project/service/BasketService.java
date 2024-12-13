package com.project.service;

import com.project.domain.Basket;
import com.project.dto.BasketItemDTO;
import com.project.repository.BasketRepository;
import com.project.repository.ItemRepository;
import com.project.repository.UserRepository;
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
}
