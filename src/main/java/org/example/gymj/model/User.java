package org.example.gymj.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;

    @OneToMany
    @JoinColumn(name ="bodyweight_id")
    private List<Bodyweight> bodyweight;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Bodyweight> getBodyweight() {
        return bodyweight;
    }

    public void setBodyweight(List<Bodyweight> bodyweight) {
        this.bodyweight = bodyweight;
    }
}
