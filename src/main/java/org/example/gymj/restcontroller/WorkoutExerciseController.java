package org.example.gymj.restcontroller;

import org.example.gymj.model.MuscleGroup;
import org.example.gymj.model.WorkoutExercise;
import org.example.gymj.model.WorkoutPlan;
import org.example.gymj.repository.WorkoutExerciseRepository;
import org.example.gymj.repository.WorkoutPlanRepository;
import org.example.gymj.service.WorkoutExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin
public class WorkoutExerciseController {

    @Autowired
    private WorkoutExerciseService workoutExerciseService;

    @Autowired
    private WorkoutExerciseRepository workoutExerciseRepository;

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;


    @PostMapping
    public WorkoutExercise createExercise(@RequestBody WorkoutExercise exercise) {
        return workoutExerciseService.save(exercise);
    }


    @PostMapping("/plans/{planId}/exercises")
    public WorkoutPlan addExerciseToPlan(@PathVariable int planId,
                                         @RequestBody WorkoutExercise exercise) {
        WorkoutPlan plan = workoutPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        // Save exercise first if new
        WorkoutExercise savedExercise = workoutExerciseRepository.save(exercise);


        plan.addExercise(savedExercise);

        return workoutPlanRepository.save(plan);
    }


    @GetMapping
    public List<WorkoutExercise> findAll() {
        return workoutExerciseService.findAll();
    }


    @GetMapping("/group/{muscleGroup}")
    public List<WorkoutExercise> getByMuscleGroup(@PathVariable MuscleGroup muscleGroup) {
        return workoutExerciseRepository.findByMuscleGroup(muscleGroup);
    }


    @PutMapping("/{id}")
    public WorkoutExercise update(@PathVariable int id,
                                  @RequestBody WorkoutExercise updatedExercise) {
        WorkoutExercise existing = workoutExerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        existing.setExerciseName(updatedExercise.getExerciseName());
        existing.setDescription(updatedExercise.getDescription());
        existing.setWeight(updatedExercise.getWeight());
        existing.setSetAmount(updatedExercise.getSetAmount());
        existing.setRepAmount(updatedExercise.getRepAmount());
        existing.setImageUrl(updatedExercise.getImageUrl());

        // Volume recalculated automatically in entity's @PreUpdate, but you can also force it:
        existing.setVolume(existing.getWeight() * existing.getSetAmount() * existing.getRepAmount());

        return workoutExerciseRepository.save(existing);
    }


    @DeleteMapping("/{id}")
    public void deleteWorkoutExercise(@PathVariable int id) {
        workoutExerciseRepository.deleteById(id);
    }
}
