package org.example.gymj.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String planName;

    @ManyToMany
    @JoinTable(
            name = "plan_exercises",
            joinColumns = @JoinColumn(name = "plan_id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id")
    )
    private List<WorkoutExercise> exercises = new ArrayList<>();

    public WorkoutPlan() {}

    public WorkoutPlan(String planName) {
        this.planName = planName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public List<WorkoutExercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<WorkoutExercise> exercises) {
        this.exercises = exercises;
    }

    public void addExercise(WorkoutExercise exercise) {
        this.exercises.add(exercise);
       // exercise.getPlans().add(this);
    }

    public void removeExercise(WorkoutExercise exercise) {
        this.exercises.remove(exercise);
        exercise.getPlans().remove(this);
    }
}
