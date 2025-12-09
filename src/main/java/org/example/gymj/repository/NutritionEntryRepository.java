package org.example.gymj.repository;

import org.example.gymj.model.NutritionEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface NutritionEntryRepository extends JpaRepository<NutritionEntry, Long> {

    // Find alle entries for én bestemt dato
    List<NutritionEntry> findByDate(LocalDate date);

    // Find alle entries sorteret efter dato (til graf)
    List<NutritionEntry> findAllByOrderByDateAsc();

    boolean existsByDate(LocalDate date);
}
