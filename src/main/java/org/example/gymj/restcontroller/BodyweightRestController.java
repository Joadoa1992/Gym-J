package org.example.gymj.restcontroller;

import org.example.gymj.model.Bodyweight;
import org.example.gymj.model.User;
import org.example.gymj.repository.BodyweightRepository;
import org.example.gymj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bodyweights")
public class BodyweightRestController {

    @Autowired
    private BodyweightRepository bodyweightRepository;

    @Autowired
    private UserRepository userRepository;

    // Create new bodyweight entry
    @PostMapping("/{userId}")
    public Bodyweight addWeight(@PathVariable Integer userId, @RequestBody Bodyweight bodyweight) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        bodyweight.setUser(user);
        return bodyweightRepository.save(bodyweight);
    }

    // Get all bodyweight entries for a user
    @GetMapping("/{userId}")
    public List<Bodyweight> getUserWeights(@PathVariable Integer userId) {
        return bodyweightRepository.findByUserId(userId);
    }

    // Update a bodyweight entry
    @PutMapping("/{id}")
    public Bodyweight updateWeight(@PathVariable Integer id, @RequestBody Bodyweight updatedWeight) {
        Bodyweight bw = bodyweightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bodyweight entry not found"));
        bw.setWeight(updatedWeight.getWeight());
        bw.setDate(updatedWeight.getDate());
        return bodyweightRepository.save(bw);
    }

    // Delete a bodyweight entry
    @DeleteMapping("/{id}")
    public String deleteWeight(@PathVariable Integer id) {
        Bodyweight bw = bodyweightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bodyweight entry not found"));
        bodyweightRepository.delete(bw);
        return "Deleted bodyweight entry with id: " + id;
    }

    // Get all bodyweight entries
    @GetMapping
    public List<Bodyweight> getAllWeights() {
        return bodyweightRepository.findAll();
    }
}
