package org.example.gymj.restcontroller;

import org.example.gymj.model.Bodyweight;
import org.example.gymj.model.User;
import org.example.gymj.repository.BodyweightRepository;
import org.example.gymj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bodyweight")
public class BodyweightRestController {

    @Autowired
    private BodyweightRepository bodyweightRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Bodyweight create(@RequestBody Bodyweight request) {

        User user = userRepository.findById(1)      // her skal det ændres, hvis man skal finde den rigtige bruger
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bodyweight bodyweight = new Bodyweight();
        bodyweight.setUser(user);
        bodyweight.setDate(request.getDate());
        bodyweight.setWeight(request.getWeight());

        return bodyweightRepository.save(bodyweight);
    }


    // Her skal der ændres hvis det skal være en særlige bruger
    @GetMapping("/all")
    public List<Bodyweight> getAll() {
        return bodyweightRepository.findAll();
    }
}
