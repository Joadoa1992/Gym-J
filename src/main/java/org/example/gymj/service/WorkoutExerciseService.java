package org.example.gymj.service;

import org.example.gymj.model.WorkoutExercise;
import org.example.gymj.repository.WorkoutExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutExerciseService {

    @Autowired
    private WorkoutExerciseRepository workoutExerciseRepository;

    public WorkoutExercise save(WorkoutExercise workoutExercise) {
        return workoutExerciseRepository.save(workoutExercise);
    }

    public List<WorkoutExercise> findAll() {
        return workoutExerciseRepository.findAll();
    }

}
