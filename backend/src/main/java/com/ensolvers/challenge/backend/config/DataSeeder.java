package com.ensolvers.challenge.backend.config;

import com.ensolvers.challenge.backend.model.Category;
import com.ensolvers.challenge.backend.model.Note;
import com.ensolvers.challenge.backend.repository.CategoryRepository;
import com.ensolvers.challenge.backend.repository.NoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

@Component
public class DataSeeder implements CommandLineRunner {

    private final NoteRepository noteRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(NoteRepository noteRepository, CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() < 1 && noteRepository.count() < 3) {
            loadSeedData();
        }
    }

    private void loadSeedData() {
        Category catPersonal = new Category();
        catPersonal.setName("Personal");
        catPersonal.setColor("oklch(90.2% 0.063 306.703)");

        Category catWork = new Category();
        catWork.setName("Work");
        catWork.setColor("#BBCB50");

        Category catIdeas = new Category();
        catIdeas.setName("Ideas");
        catIdeas.setColor("#678CEC");

        categoryRepository.saveAll(Arrays.asList(catPersonal, catWork, catIdeas));

        Note note1 = new Note();
        note1.setTitle("Buy groceries");
        note1.setContent("Milk, Bread, Cheese, and Fruits.");
        note1.setCategories(new HashSet<>(Arrays.asList(catPersonal)));
        note1.setArchived(false);

        Note note2 = new Note();
        note2.setTitle("Finish project report");
        note2.setContent("Complete the final section and send for review.");
        note2.setCategories(new HashSet<>(Arrays.asList(catWork)));
        note2.setArchived(false);

        Note note3 = new Note();
        note3.setTitle("Brainstorm new app features");
        note3.setContent("Think about user authentication and profiles.");
        note3.setCategories(new HashSet<>(Arrays.asList(catWork, catIdeas)));
        note3.setArchived(false);

        Note note4 = new Note();
        note4.setTitle("Read 'The Pragmatic Programmer'");
        note4.setContent("Read the first 3 chapters.");
        note4.setArchived(true); 

        noteRepository.saveAll(Arrays.asList(note1, note2, note3, note4));
    }
}
