package org.example.gymj.config;

import jakarta.annotation.PostConstruct;
import org.example.gymj.model.WorkoutExercise;
import org.example.gymj.model.WorkoutPlan;
import org.example.gymj.repository.WorkoutExerciseRepository;
import org.example.gymj.repository.WorkoutPlanRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlanData {

    private final WorkoutExerciseRepository exerciseRepo;
    private final WorkoutPlanRepository planRepo;

    public PlanData(WorkoutExerciseRepository exerciseRepo, WorkoutPlanRepository planRepo) {
        this.exerciseRepo = exerciseRepo;
        this.planRepo = planRepo;
    }

    @PostConstruct
    public void loadPlans() {
        if (planRepo.count() > 0) return; // avoid duplicates

        List<WorkoutExercise> exercises = exerciseRepo.findAll();

        // --------------------------
        // Full Body Plan
        // --------------------------
        WorkoutPlan fullBody = new WorkoutPlan("Full Body Plan");
        fullBody.addExercise(findExercise(exercises, "Squat"));
        fullBody.addExercise(findExercise(exercises, "Deadlift"));
        fullBody.addExercise(findExercise(exercises, "Bench Press"));
        fullBody.addExercise(findExercise(exercises, "Pull Ups"));
        fullBody.addExercise(findExercise(exercises, "Shoulder Press"));
        fullBody.addExercise(findExercise(exercises, "Bicep Curl"));
        planRepo.save(fullBody);

        // --------------------------
        // Push Day Plan
        // --------------------------
        WorkoutPlan pushDay = new WorkoutPlan("Push Day");
        pushDay.addExercise(findExercise(exercises, "Bench Press"));
        pushDay.addExercise(findExercise(exercises, "Incline Bench Press"));
        pushDay.addExercise(findExercise(exercises, "Shoulder Press"));
        pushDay.addExercise(findExercise(exercises, "Chest Flies"));
        pushDay.addExercise(findExercise(exercises, "Tricep Pushdown"));
        pushDay.addExercise(findExercise(exercises, "Dips"));
        planRepo.save(pushDay);

        // --------------------------
        // Pull Day Plan
        // --------------------------
        WorkoutPlan pullDay = new WorkoutPlan("Pull Day");
        pullDay.addExercise(findExercise(exercises, "Pull Ups"));
        pullDay.addExercise(findExercise(exercises, "Seated Row"));
        pullDay.addExercise(findExercise(exercises, "Cable Row"));
        pullDay.addExercise(findExercise(exercises, "Back Extension"));
        pullDay.addExercise(findExercise(exercises, "Bicep Curl"));
        pullDay.addExercise(findExercise(exercises, "Preacher Curl"));
        planRepo.save(pullDay);

        // --------------------------
        // Leg Day Plan
        // --------------------------
        WorkoutPlan legDay = new WorkoutPlan("Leg Day");
        legDay.addExercise(findExercise(exercises, "Squat"));
        legDay.addExercise(findExercise(exercises, "Leg Press"));
        legDay.addExercise(findExercise(exercises, "Bulgarian Split Squat"));
        legDay.addExercise(findExercise(exercises, "Romanian Deadlift"));
        legDay.addExercise(findExercise(exercises, "Calf Raises"));
        legDay.addExercise(findExercise(exercises, "Leg Extension"));
        planRepo.save(legDay);

        System.out.println("Workout plans created!");
    }

    // --------------------------
    // Helper method outside of @PostConstruct
    // --------------------------
    private WorkoutExercise findExercise(List<WorkoutExercise> exercises, String name) {
        return exercises.stream()
                .filter(e -> e.getExerciseName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Exercise not found: " + name));
    }
}
