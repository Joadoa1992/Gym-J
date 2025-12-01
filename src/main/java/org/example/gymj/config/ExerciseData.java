package org.example.gymj.config;

import jakarta.annotation.PostConstruct;
import org.example.gymj.model.MuscleGroup;
import org.example.gymj.model.WorkoutExercise;
import org.example.gymj.repository.WorkoutExerciseRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExerciseData {

    private final WorkoutExerciseRepository repo;

    public ExerciseData(WorkoutExerciseRepository repo) {
        this.repo = repo;
    }

    @PostConstruct
    public void loadExercises() {

        if (repo.count() > 0) return;

        List<WorkoutExercise> exercises = List.of(

                new WorkoutExercise(0, "Back Extension", "", 0, 0, 0, 0, "images/back-extension.webp", MuscleGroup.BACK),
                new WorkoutExercise(0, "Bench Press", "", 0, 0, 0, 0, "images/bench-press.jpg", MuscleGroup.CHEST),
                new WorkoutExercise(0, "Bicep Curl", "", 0, 0, 0, 0, "images/bicep-curl.jpg", MuscleGroup.ARMS),
                new WorkoutExercise(0, "Bulgarian Split Squat", "", 0, 0, 0, 0, "images/bulgarian-split-squat.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Cable Crunch", "", 0, 0, 0, 0, "images/cable-crunch.jpg", MuscleGroup.CORE),
                new WorkoutExercise(0, "Cable Row", "", 0, 0, 0, 0, "images/cable-row.jpg", MuscleGroup.BACK),
                new WorkoutExercise(0, "Calf Raises", "", 0, 0, 0, 0, "images/calf-raises.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Chest Flies", "", 0, 0, 0, 0, "images/chest-flies.jpg", MuscleGroup.CHEST),
                new WorkoutExercise(0, "Deadlift", "", 0, 0, 0, 0, "images/deadlift.jpg", MuscleGroup.BACK),
                new WorkoutExercise(0, "Dips", "", 0, 0, 0, 0, "images/dips.jpg", MuscleGroup.ARMS),
                new WorkoutExercise(0, "Hip Adduction", "", 0, 0, 0, 0, "images/hip-adduction.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Hip Thrust", "", 0, 0, 0, 0, "images/hip-thrust.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Incline Bench Press", "", 0, 0, 0, 0, "images/Incline-bench-press.jpg", MuscleGroup.CHEST),
                new WorkoutExercise(0, "Lateral Raise", "", 0, 0, 0, 0, "images/lateral_raise.jpg", MuscleGroup.SHOULDERS),
                new WorkoutExercise(0, "Leg Extension", "", 0, 0, 0, 0, "images/leg-extension.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Leg Press", "", 0, 0, 0, 0, "images/leg-press.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Leg Raises", "", 0, 0, 0, 0, "images/leg-raises.jpg", MuscleGroup.CORE),
                new WorkoutExercise(0, "Preacher Curl", "", 0, 0, 0, 0, "images/preacher-curl.jpg", MuscleGroup.ARMS),
                new WorkoutExercise(0, "Preacher Curl Barbell", "", 0, 0, 0, 0, "images/preacher-curl-barbell.jpg", MuscleGroup.ARMS),
                new WorkoutExercise(0, "Pull Ups", "", 0, 0, 0, 0, "images/pull-ups.jpg", MuscleGroup.BACK),
                new WorkoutExercise(0, "Pulldown", "", 0, 0, 0, 0, "images/pulldown.jpg", MuscleGroup.BACK),
                new WorkoutExercise(0, "Rear Delt", "", 0, 0, 0, 0, "images/rear-delt.jpg", MuscleGroup.SHOULDERS),
                new WorkoutExercise(0, "Romanian Deadlift", "", 0, 0, 0, 0, "images/romanian-deadlift.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Seated Leg Curl", "", 0, 0, 0, 0, "images/seated-leg-curl.webp", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Seated Row", "", 0, 0, 0, 0, "images/seated-row.jpg", MuscleGroup.BACK),
                new WorkoutExercise(0, "Shoulder Press", "", 0, 0, 0, 0, "images/shoulder-press.jpg", MuscleGroup.SHOULDERS),
                new WorkoutExercise(0, "Skull Crusher", "", 0, 0, 0, 0, "images/skull-crusher.jpg", MuscleGroup.ARMS),
                new WorkoutExercise(0, "Squat", "", 0, 0, 0, 0, "images/squat.jpg", MuscleGroup.LEGS),
                new WorkoutExercise(0, "Tricep Pushdown", "", 0, 0, 0, 0, "images/tricep-pushdown.jpg", MuscleGroup.ARMS)
        );

        repo.saveAll(exercises);
    }
}
