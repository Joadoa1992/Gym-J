package org.example.gymj.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String exerciseName;

    @Column (length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;

    private double weight;
    private int setAmount;
    private int repAmount;

    // volume = weight * setAmount * repAmount
    private double volume;
    private String imageUrl;

    @ManyToMany(mappedBy = "exercises")
    @JsonIgnore
    private Set<WorkoutPlan> plans = new HashSet<>();

    @PrePersist
    @PreUpdate
    public void calculateVolume() {
        this.volume = weight * setAmount * repAmount;
    }



    public WorkoutExercise() {
    }

    public WorkoutExercise(int id, String exerciseName, String description, double weight, int setAmount, int repAmount, double volume, String imageUrl) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.description = description;
        this.weight = weight;
        this.setAmount = setAmount;
        this.repAmount = repAmount;
        this.volume = volume;
        this.imageUrl = imageUrl;
    }



    public WorkoutExercise(String exerciseName, String description, MuscleGroup muscleGroup, double weight,
                           int setAmount, int repAmount, String imageUrl) {
        this.exerciseName = exerciseName;
        this.description = description;
        this.muscleGroup = muscleGroup;
        this.weight = weight;
        this.setAmount = setAmount;
        this.repAmount = repAmount;
        this.imageUrl = imageUrl;
        calculateVolume();
    }

    public WorkoutExercise(int id, String exerciseName, String description, MuscleGroup muscleGroup, double weight, int setAmount, int repAmount, double volume, String imageUrl) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.description = description;
        this.muscleGroup = muscleGroup;
        this.weight = weight;
        this.setAmount = setAmount;
        this.repAmount = repAmount;
        this.volume = volume;
        this.imageUrl = imageUrl;
    }
    public WorkoutExercise(
            int id,
            String exerciseName,
            String description,
            double weight,
            int setAmount,
            int repAmount,
            double volume,
            String imageUrl,
            MuscleGroup muscleGroup
    ) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.description = description;
        this.weight = weight;
        this.setAmount = setAmount;
        this.repAmount = repAmount;
        this.volume = volume;
        this.imageUrl = imageUrl;
        this.muscleGroup = muscleGroup;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getSetAmount() {
        return setAmount;
    }

    public void setSetAmount(int setAmount) {
        this.setAmount = setAmount;
    }

    public int getRepAmount() {
        return repAmount;
    }

    public void setRepAmount(int repAmount) {
        this.repAmount = repAmount;
    }

    public double getVolume() {
        return volume;
    }

    public void setVolume(double volume) {
        this.volume = volume;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MuscleGroup getMuscleGroup() {
        return muscleGroup;
    }

    public void setMuscleGroup(MuscleGroup muscleGroup) {
        this.muscleGroup = muscleGroup;
    }

    public Set<WorkoutPlan> getPlans() {
        return plans;
    }

    public void setPlans(Set<WorkoutPlan> plans) {
        this.plans = plans;
    }
}
