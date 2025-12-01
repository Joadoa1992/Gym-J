package org.example.gymj.repository;

import org.example.gymj.model.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Integer> {
    List<WorkoutLog> findByExerciseId(int exerciseId);
    
}
