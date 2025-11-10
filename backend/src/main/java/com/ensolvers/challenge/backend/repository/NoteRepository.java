package com.ensolvers.challenge.backend.repository;

import com.ensolvers.challenge.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchived(boolean archived);

    List<Note> findByCategories_Name(String name);

    List<Note> findByArchivedAndCategories_Name(boolean archived, String name);
}
