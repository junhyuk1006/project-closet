package com.project.repository.admin;

import com.project.domain.detail.ItemInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminAskRepository extends JpaRepository<ItemInquiry,Long> {

}
