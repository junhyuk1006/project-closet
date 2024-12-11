package com.project.controller.admin;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;

@ControllerAdvice
public class GlobalBindingInitalizer {
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Timestamp.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                try {
                    setValue(Timestamp.valueOf(text + " 00:00:00"));
                } catch (IllegalArgumentException e) {
                    setValue(null);
                }
            }
        });
    }
}
