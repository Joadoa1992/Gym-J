package org.example.gymj.repository;

import org.example.gymj.model.PrRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PrRecordRepository extends JpaRepository<PrRecord, Long> {

    // ALLE PR’er for én bestemt øvelse (til graf)
    List<PrRecord> findByExerciseOrderByDateAsc(String exercise);

    // SENESTE PR for én bestemt øvelse (til oversigt)
    Optional<PrRecord> findTopByExerciseOrderByDateDesc(String exercise);

    boolean existsByDateAndExercise(LocalDate date, String exercise);
}
