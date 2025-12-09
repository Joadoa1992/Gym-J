package org.example.gymj.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;
    private String firstName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Bodyweight> bodyweight;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Bodyweight> bodyweights;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public List<Bodyweight> getBodyweight() { return bodyweight; }
    public void setBodyweight(List<Bodyweight> bodyweight) { this.bodyweight = bodyweight; }

    public List<Bodyweight> getBodyweights() {
        return bodyweights;
    }

    public void setBodyweights(List<Bodyweight> bodyweights) {
        this.bodyweights = bodyweights;
    }

}

