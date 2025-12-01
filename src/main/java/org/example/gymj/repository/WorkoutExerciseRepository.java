package org.example.gymj.repository;

import org.example.gymj.model.MuscleGroup;
import org.example.gymj.model.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutExerciseRepository  extends JpaRepository<WorkoutExercise, Integer> {

    List<WorkoutExercise> findByMuscleGroup(MuscleGroup muscleGroup);


}
