package org.example.gymj.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "nutrition_entry")
public class NutritionEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int calories;

    @Column(nullable = false)
    private int fat;

    @Column(nullable = false)
    private int protein;

    // Krævet tom konstruktør til JPA
    public NutritionEntry() {
    }

    public NutritionEntry(LocalDate date, int calories, int fat, int protein) {
        this.date = date;
        this.calories = calories;
        this.fat = fat;
        this.protein = protein;
    }

    // Getters og setters

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public int getFat() {
        return fat;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public int getProtein() {
        return protein;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }
}
