package com.project.service.Admin;

import com.project.domain.Grade;
import com.project.domain.Users;
import com.project.dto.*;
import com.project.repository.UserRepository;
import com.project.repository.admin.AdminGradeRepository;
import com.project.repository.admin.AdminPointRepository;
import com.project.repository.admin.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;
    private final AdminGradeRepository adminGradeRepository;
    private final AdminPointRepository adminPointRepository;

    public List<Users> getAllUsers() {
        return adminUserRepository.findAll();
    }

    public Page<AdminUserDTO> getUsers(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminUserRepository.findAllAdminUsers(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate(),
                pageRequestDTO.getGrade());
    }

    public List<Grade> getAllGrades() {
        return adminGradeRepository.findAll();
    }

    public List<Grade> updateGrades(List<Grade> grades) {

       grades.removeIf(grade -> {
           boolean shouldRemove = !StringUtils.hasText(grade.getGrade()) || !StringUtils.hasText(grade.getGradeDescription());
           if(shouldRemove) {
               adminGradeRepository.delete(grade);
           }
           return shouldRemove;
       });


        return adminGradeRepository.saveAll(grades);
    }

    public Page<AdminPointDTO> getUserPoint(Pageable pageable, PageRequestDTO pageRequestDTO) {
        return adminPointRepository.findAllPointUser(pageable,
                pageRequestDTO.getSearchKeyword(),
                pageRequestDTO.getSearchInput(),
                pageRequestDTO.getStartDate(),
                pageRequestDTO.getEndDate());
    }

    public List<AdminUserMonthDTO> getUserMonth(){
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusYears(1);
        return adminUserRepository.findUserMonth(startDate,endDate);
    }

    public int getUserDate(Timestamp startDate, Timestamp endDate) {
        if(endDate != null){
            LocalDateTime endDateTime = endDate.toLocalDateTime();
            endDateTime = endDateTime.plusDays(1);
            endDate = Timestamp.valueOf(endDateTime);
        }
        return adminUserRepository.findUserDate(startDate,endDate);
    }

    public AdminUserTodayDTO getUserToday(Timestamp date) {
        LocalDateTime plusDateTime = date.toLocalDateTime();
        plusDateTime = plusDateTime.plusDays(1);
        Timestamp endDate = Timestamp.valueOf(plusDateTime);

        int todayUser = adminUserRepository.findUserDate(date,endDate);
        int totalUser = adminUserRepository.findUserDate(null,null);

        return new AdminUserTodayDTO(todayUser,totalUser);
    }
}
