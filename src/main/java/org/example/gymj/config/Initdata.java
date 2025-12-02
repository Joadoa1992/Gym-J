
package org.example.gymj.config;

import org.example.gymj.model.Bodyweight;
import org.example.gymj.model.User;
import org.example.gymj.repository.BodyweightRepository;
import org.example.gymj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class Initdata implements CommandLineRunner {

    @Autowired
    BodyweightRepository bodyweightRepository;
    @Autowired
    UserRepository userRepository;


    @Override
    public void run(String... args) throws Exception {

        User user = userRepository.findByUsername("John");

        if (user == null) {
            user = new User();
            user.setUsername("John");
            user.setPassword("john");
            user = userRepository.save(user);
        }

        List<Bodyweight> entries = List.of(
                new Bodyweight(90.5, LocalDate.now().plusDays(1), user),
                new Bodyweight(90.3, LocalDate.now().plusDays(2), user),
                new Bodyweight(89.8, LocalDate.now().plusDays(3), user),
                new Bodyweight(89.8, LocalDate.now().plusDays(4), user),
                new Bodyweight(89.6, LocalDate.now().plusDays(5), user),
                new Bodyweight(88.9, LocalDate.now().plusDays(6), user),
                new Bodyweight(88.9, LocalDate.now().plusDays(7), user),
                new Bodyweight(88.4, LocalDate.now().plusDays(8), user),
                new Bodyweight(89.0, LocalDate.now().plusDays(9), user),
                new Bodyweight(80.0, LocalDate.now().plusDays(20), user)
        );

        for (Bodyweight entry : entries) {
            if (!bodyweightRepository.existsByDateAndUser(entry.getDate(), user)) {
                bodyweightRepository.save(entry);
            }
        }
    }

}