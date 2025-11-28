package org.example.gymj.restcontroller;

import org.example.gymj.model.PrRecord;
import org.example.gymj.repository.PrRecordRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pr")
public class PrRestController {

    private final PrRecordRepository prRecordRepository;

    public PrRestController(PrRecordRepository prRecordRepository) {
        this.prRecordRepository = prRecordRepository;
    }

    @GetMapping
    public List<PrRecord> getAll() {
        return prRecordRepository.findAll();
    }

    @GetMapping("/latest")
    public List<PrRecord> getLatestForAllExercises() {
        List<PrRecord> latest = new ArrayList<>();
        getLatestForExercise("BENCH").ifPresent(latest::add);
        getLatestForExercise("SQUAT").ifPresent(latest::add);
        getLatestForExercise("DEADLIFT").ifPresent(latest::add);
        return latest;
    }

    private Optional<PrRecord> getLatestForExercise(String exercise) {
        return prRecordRepository.findTopByExerciseOrderByDateDesc(exercise);
    }

    @PostMapping
    public PrRecord create(@RequestBody PrRecord record) {
        if (record.getDate() == null) {
            record.setDate(LocalDate.now());
        }
        return prRecordRepository.save(record);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        prRecordRepository.deleteById(id);
    }
}
