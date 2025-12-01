
package org.example.gymj.config;

import org.example.gymj.model.Bodyweight;
import org.example.gymj.model.User;
import org.example.gymj.repository.BodyweightRepository;
import org.example.gymj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class Initdata implements CommandLineRunner {

    @Autowired
    BodyweightRepository bodyweightRepository;
    @Autowired
    UserRepository userRepository;


    @Override
    public void run(String... args) throws Exception {

        // 🎟️ Create user
        User user = new User();
        user.setUsername("John");
        user.setPassword("john");

        userRepository.save(user);


        // 🎬 Create Bodyweight
        Bodyweight bodyweight = new Bodyweight();
        bodyweight.setUser(user);
        bodyweight.setDate(LocalDate.now().plusDays(1));
        bodyweight.setWeight(90.5);
        bodyweightRepository.save(bodyweight);
        Bodyweight bodyweight2 = new Bodyweight();
        bodyweight2.setUser(user);
        bodyweight2.setDate(LocalDate.now().plusDays(2));
        bodyweight2.setWeight(90.3);
        bodyweightRepository.save(bodyweight2);
        Bodyweight bodyweight3 = new Bodyweight();
        bodyweight3.setUser(user);
        bodyweight3.setDate(LocalDate.now().plusDays(3));
        bodyweight3.setWeight(89.8);
        bodyweightRepository.save(bodyweight3);
        Bodyweight bodyweight4 = new Bodyweight();
        bodyweight4.setUser(user);
        bodyweight4.setDate(LocalDate.now().plusDays(4));
        bodyweight4.setWeight(89.8);
        bodyweightRepository.save(bodyweight4);
        Bodyweight bodyweight5 = new Bodyweight();
        bodyweight5.setUser(user);
        bodyweight5.setDate(LocalDate.now().plusDays(5));
        bodyweight5.setWeight(89.6);
        bodyweightRepository.save(bodyweight5);
        Bodyweight bodyweight6 = new Bodyweight();
        bodyweight6.setUser(user);
        bodyweight6.setDate(LocalDate.now().plusDays(6));
        bodyweight6.setWeight(88.9);
        bodyweightRepository.save(bodyweight6);
        Bodyweight bodyweight7 = new Bodyweight();
        bodyweight7.setUser(user);
        bodyweight7.setDate(LocalDate.now().plusDays(7));
        bodyweight7.setWeight(88.9);
        bodyweightRepository.save(bodyweight7);
        Bodyweight bodyweight8 = new Bodyweight();
        bodyweight8.setUser(user);
        bodyweight8.setDate(LocalDate.now().plusDays(8));
        bodyweight8.setWeight(88.4);
        bodyweightRepository.save(bodyweight8);
        Bodyweight bodyweight9 = new Bodyweight();
        bodyweight9.setUser(user);
        bodyweight9.setDate(LocalDate.now().plusDays(9));
        bodyweight9.setWeight(89.0);
        bodyweightRepository.save(bodyweight9);
        Bodyweight bodyweight10 = new Bodyweight();
        bodyweight10.setUser(user);
        bodyweight10.setDate(LocalDate.now().plusDays(20));
        bodyweight10.setWeight(80.0);
        bodyweightRepository.save(bodyweight10);
    }

}