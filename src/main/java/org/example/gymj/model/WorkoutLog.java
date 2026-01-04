package org.example.gymj.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.example.gymj.model.WorkoutExercise;

import java.time.LocalDate;

@Entity
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate date;
    private Integer weight;
    private Integer setsCompleted;
    private Integer repsCompleted;
    private Integer totalVolume;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    @JsonIgnore
    private WorkoutExercise exercise;

    public WorkoutLog() {}

    public WorkoutLog(
            Integer id,
            LocalDate date,
            Integer weight,
            Integer setsCompleted,
            Integer repsCompleted,
            Integer totalVolume,
            WorkoutExercise exercise
    ) {
        this.id = id;
        this.date = date;
        this.weight = weight;
        this.setsCompleted = setsCompleted;
        this.repsCompleted = repsCompleted;
        this.totalVolume = totalVolume;
        this.exercise = exercise;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getSetsCompleted() {
        return setsCompleted;
    }

    public void setSetsCompleted(Integer setsCompleted) {
        this.setsCompleted = setsCompleted;
    }

    public Integer getRepsCompleted() {
        return repsCompleted;
    }

    public void setRepsCompleted(Integer repsCompleted) {
        this.repsCompleted = repsCompleted;
    }

    public Integer getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(Integer totalVolume) {
        this.totalVolume = totalVolume;
    }

    public WorkoutExercise getExercise() {
        return exercise;
    }

    public void setExercise(WorkoutExercise exercise) {
        this.exercise = exercise;
    }

    @PrePersist
    public void setDateAutomatically() {
        this.date = LocalDate.now();
    }
}
