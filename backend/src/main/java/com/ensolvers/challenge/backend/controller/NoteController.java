package com.ensolvers.challenge.backend.controller;
import com.ensolvers.challenge.backend.model.Note;
import com.ensolvers.challenge.backend.service.CategoryService;
import com.ensolvers.challenge.backend.service.NoteService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin
public class NoteController {
    private final NoteService service;
    private final CategoryService categoryService;

    public NoteController(NoteService service, CategoryService categoryService) {
        this.service = service;
        this.categoryService = categoryService;
    }

    @GetMapping("/active")
    public List<Note> active() {
        return service.getActiveNotes();
    }

    @GetMapping("/archived")
    public List<Note> archived() {
        return service.getArchivedNotes();
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return service.create(note);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note note) {
        return service.update(id, note);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}/archive")
    public void archive(@PathVariable Long id) {
        service.archive(id);
    }

    @PutMapping("/{id}/unarchive")
    public void unarchive(@PathVariable Long id) {
        service.unarchive(id);
    }

    @PutMapping("/{noteId}/categories/{categoryId}")
    public void addCategory(@PathVariable Long noteId, @PathVariable Long categoryId){
        categoryService.addCategoryToNote(noteId, categoryId);
    }

    @DeleteMapping("/{noteId}/categories/{categoryId}")
    public void deleteCategory(@PathVariable Long noteId, @PathVariable Long categoryId){
        categoryService.removeCategoryFromNote(noteId, categoryId);
    }

    @GetMapping
    public List<Note> listByCategory(@RequestParam(value = "category", required = false) String category) {
        if (category != null && !category.isBlank()) {
            return categoryService.findNotesByCategoryName(category);
        }
        return service.getActiveNotes();
    }
}
