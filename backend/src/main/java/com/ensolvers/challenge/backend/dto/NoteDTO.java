package com.ensolvers.challenge.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteDTO {

    @NotBlank(message = "Title is mandatory")
    private String title;

    @Size(max = 2000, message = "Content must not exceed 2000 characters")
    private String content;
}
