package org.example.gymj.restcontroller;

import org.example.gymj.model.WorkoutPlan;
import org.example.gymj.repository.WorkoutPlanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @PostMapping
    public WorkoutPlan createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    @GetMapping
    public List<WorkoutPlan> allWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @GetMapping("/{id}")
    public WorkoutPlan findWorkoutPlanById(@PathVariable int id) {
        return workoutPlanRepository.findById(id).orElse(null);
    }



    @DeleteMapping("/{id}")
    public void deleteWorkoutPlanById(@PathVariable int id) {
        workoutPlanRepository.deleteById(id);
    }







}

