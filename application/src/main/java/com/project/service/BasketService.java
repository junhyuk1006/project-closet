package com.project.service;

import com.project.domain.Basket;
import com.project.dto.BasketItemDTO;
import com.project.repository.BasketRepository;
import com.project.repository.ItemDetailRepository;
import com.project.repository.ItemRepository;
import com.project.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BasketService {
    private final BasketRepository basketRepository;
    private final UsersRepository usersRepository;
    private final ItemRepository itemRepository;

    public void saveBasket(BasketItemDTO basketItemDTO) {

        // DTO → 엔티티 변환
        Basket basket = new Basket();
        basket.setId(basketItemDTO.getBasketId());
        basket.setItemCount(basketItemDTO.getItemCount());
        basket.setSize(basketItemDTO.getSize());
        basket.setColor(basketItemDTO.getColor());

        basket.setUsers(usersRepository.findById(basketItemDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));

        basket.setItemDetail(itemRepository.findById(basketItemDTO.getItemDetailId())
                .orElseThrow(() -> new RuntimeException("ItemDetail not found")));

        basketRepository.save(basket);
    }

    public List<BasketItemDTO> getBasket(Long userId) {return basketRepository.findByUserId(userId);}
}
