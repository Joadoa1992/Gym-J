package org.example.gymj.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pr_record")
public class PrRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // "BENCH", "SQUAT", "DEADLIFT"
    @Column(nullable = false)
    private String exercise;

    @Column(nullable = false)
    private int weight;

    @Column(nullable = false)
    private LocalDate date;

    public PrRecord() {
    }

    public PrRecord(String exercise, int weight, LocalDate date) {
        this.exercise = exercise;
        this.weight = weight;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
