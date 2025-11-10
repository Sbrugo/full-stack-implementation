package com.ensolvers.challenge.backend.service;

import com.ensolvers.challenge.backend.model.Category;
import com.ensolvers.challenge.backend.model.Note;
import com.ensolvers.challenge.backend.repository.CategoryRepository;
import com.ensolvers.challenge.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final NoteRepository noteRepository;

    public CategoryService(CategoryRepository categoryRepository, NoteRepository noteRepository) {
        this.categoryRepository = categoryRepository;
        this.noteRepository = noteRepository;
    }

    public Category createCategory(Category category) {
        Optional<Category> existing = categoryRepository.findByName(category.getName());
        return existing.orElseGet(() -> categoryRepository.save(category));
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public void addCategoryToNote(Long noteId, Long categoryId) {
        Optional<Note> noteOpt = noteRepository.findById(noteId);
        Optional<Category> catOpt = categoryRepository.findById(categoryId);

        if (noteOpt.isPresent() && catOpt.isPresent()) {
            Note note = noteOpt.get();
            Category cat = catOpt.get();
            note.getCategories().add(cat);
            noteRepository.save(note); 
        }
    }

    public void removeCategoryFromNote(Long noteId, Long categoryId) {
        Optional<Note> noteOpt = noteRepository.findById(noteId);
        Optional<Category> catOpt = categoryRepository.findById(categoryId);

        if (noteOpt.isPresent() && catOpt.isPresent()) {
            Note note = noteOpt.get();
            Category cat = catOpt.get();
            if (note.getCategories().contains(cat)) {
                note.getCategories().remove(cat);
                noteRepository.save(note);
            }
        }
    }

    public List<Note> findNotesByCategoryName(String categoryName) {
        return noteRepository.findByCategories_Name(categoryName);
    }
}
