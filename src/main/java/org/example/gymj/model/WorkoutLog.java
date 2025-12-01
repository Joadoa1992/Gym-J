package org.example.gymj.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate date;
    private int weight;
    private int setsCompleted;
    private int repsCompleted;
    private int totalVolume;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private WorkoutExercise exercise;


    public WorkoutLog() {
    }

    public WorkoutLog(int id, LocalDate date, int weight, int setsCompleted, int repsCompleted, int totalVolume, WorkoutExercise exercise) {
        this.id = id;
        this.date = date;
        this.weight = weight;
        this.setsCompleted = setsCompleted;
        this.repsCompleted = repsCompleted;
        this.totalVolume = totalVolume;
        this.exercise = exercise;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getSetsCompleted() {
        return setsCompleted;
    }

    public void setSetsCompleted(int setsCompleted) {
        this.setsCompleted = setsCompleted;
    }

    public int getRepsCompleted() {
        return repsCompleted;
    }

    public void setRepsCompleted(int repsCompleted) {
        this.repsCompleted = repsCompleted;
    }

    public int getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(int totalVolume) {
        this.totalVolume = totalVolume;
    }

    public WorkoutExercise getExercise() {
        return exercise;
    }

    public void setExercise(WorkoutExercise exercise) {
        this.exercise = exercise;
    }
}
