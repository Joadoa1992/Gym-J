
package org.example.gymj.config;

import org.example.gymj.model.Bodyweight;
import org.example.gymj.model.NutritionEntry;
import org.example.gymj.model.PrRecord;
import org.example.gymj.model.User;
import org.example.gymj.repository.BodyweightRepository;
import org.example.gymj.repository.NutritionEntryRepository;
import org.example.gymj.repository.PrRecordRepository;
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
    @Autowired
    PrRecordRepository prRecordRepository;
    @Autowired
    NutritionEntryRepository nutritionEntryRepository;


    @Override
    public void run(String... args) throws Exception {

        User user = userRepository.findByUsername("John");

        List<User> users = List.of(
                new User("Admin","1234"),
                new User("Güney","1234"),
                new User("Mads","1234"),
                new User("Joakim","1234"),
                new User("Yosef","1234")

        );

        for(User u : users) {
            if(!userRepository.existsByUsername(u.getUsername())) {
                userRepository.save(u);
            }
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

        List<NutritionEntry> nutritionEntries = List.of(
                new NutritionEntry(LocalDate.now(), 50, 50, 50),
                new NutritionEntry(LocalDate.now().plusDays(1), 50, 50, 50),
                new NutritionEntry(LocalDate.now().plusDays(2), 55, 60, 100),
                new NutritionEntry(LocalDate.now().plusDays(3), 80, 30, 150),
                new NutritionEntry(LocalDate.now().plusDays(4), 100, 1000, 500),
                new NutritionEntry(LocalDate.now().plusDays(5), 200, 300, 120),
                new NutritionEntry(LocalDate.now().plusDays(6), 300, 350, 350),
                new NutritionEntry(LocalDate.now().plusDays(7), 50, 50, 50)
        );

        for (NutritionEntry entry : nutritionEntries) {
            if(!nutritionEntryRepository.existsByDate(entry.getDate())) {
                nutritionEntryRepository.save(entry);
            }
        }


        List<PrRecord> prRecords = List.of(
                new PrRecord("BENCH",50, LocalDate.now()),
                new PrRecord("BENCH",53, LocalDate.now().plusDays(1)),
                new PrRecord("BENCH",58, LocalDate.now().plusDays(2)),
                new PrRecord("BENCH",58, LocalDate.now().plusDays(3)),
                new PrRecord("BENCH",60, LocalDate.now().plusDays(4)),
                new PrRecord("SQUAT",50, LocalDate.now()),
                new PrRecord("SQUAT",52, LocalDate.now().plusDays(1)),
                new PrRecord("SQUAT",52, LocalDate.now().plusDays(2)),
                new PrRecord("SQUAT",54, LocalDate.now().plusDays(3)),
                new PrRecord("SQUAT",55, LocalDate.now().plusDays(4)),
                new PrRecord("DEADLIFT",50, LocalDate.now()),
                new PrRecord("DEADLIFT",51, LocalDate.now().plusDays(1)),
                new PrRecord("DEADLIFT",51, LocalDate.now().plusDays(2)),
                new PrRecord("DEADLIFT",55, LocalDate.now().plusDays(3)),
                new PrRecord("DEADLIFT",55, LocalDate.now().plusDays(4))
                );

        for (PrRecord prRecord : prRecords) {
            if(!prRecordRepository.existsByDateAndExercise(prRecord.getDate(), prRecord.getExercise())) {
                prRecordRepository.save(prRecord);
            }
        }
    }

}