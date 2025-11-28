package org.example.gymj.restcontroller;

import org.example.gymj.model.NutritionEntry;
import org.example.gymj.repository.NutritionEntryRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/nutrition")
public class NutritionRestController {

    private final NutritionEntryRepository nutritionEntryRepository;

    public NutritionRestController(NutritionEntryRepository nutritionEntryRepository) {
        this.nutritionEntryRepository = nutritionEntryRepository;
    }

    @GetMapping
    public List<NutritionEntry> getAll() {
        return nutritionEntryRepository.findAllByOrderByDateAsc();
    }

    @GetMapping("/by-date")
    public List<NutritionEntry> getByDate(@RequestParam String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return nutritionEntryRepository.findByDate(parsedDate);
    }

    @PostMapping
    public NutritionEntry create(@RequestBody NutritionEntry entry) {
        if (entry.getDate() == null) {
            entry.setDate(LocalDate.now());
        }
        return nutritionEntryRepository.save(entry);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        nutritionEntryRepository.deleteById(id);
    }
}
