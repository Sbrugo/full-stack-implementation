package com.ensolvers.challenge.backend.service;
import com.ensolvers.challenge.backend.model.Note;
import com.ensolvers.challenge.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {
    private final NoteRepository repo;

    public NoteService(NoteRepository repo){
        this.repo = repo;
    }

    public List<Note> getActiveNotes() {
        return repo.findByArchived(false);
    }

    public List<Note> getArchivedNotes() {
        return repo.findByArchived(true);
    }

    public Note create(Note note) {
        return repo.save(note);
    }

    public Note update(Long id, Note updated) {
        Note note = repo.findById(id).orElseThrow();
        note.setTitle(updated.getTitle());
        note.setContent(updated.getContent());
        return repo.save(note);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public void archive(Long id) {
        Note note = repo.findById(id).orElseThrow();
        note.setArchived(true);
        repo.save(note);
    }

    public void unarchive(Long id) {
        Note note = repo.findById(id).orElseThrow();
        note.setArchived(false);
        repo.save(note);
    }
}
