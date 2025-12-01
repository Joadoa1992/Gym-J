package org.example.gymj.restcontroller;

import org.example.gymj.model.WorkoutExercise;
import org.example.gymj.model.WorkoutLog;
import org.example.gymj.repository.WorkoutExerciseRepository;
import org.example.gymj.repository.WorkoutLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin
public class WorkoutLogController {

    @Autowired
    private WorkoutLogRepository logRepo;

    private final WorkoutExerciseRepository exerciseRepo;

    public WorkoutLogController(WorkoutExerciseRepository exerciseRepo) {
        this.exerciseRepo = exerciseRepo;
    }

    @PostMapping("/{exerciseId}")
    public WorkoutLog createLog(@PathVariable int exerciseId,
                                @RequestBody WorkoutLog log) {

        WorkoutExercise exercise = exerciseRepo.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        log.setExercise(exercise);
        log.setTotalVolume(log.getWeight() * log.getSetsCompleted() * log.getRepsCompleted());
        log.setDate(LocalDate.now());

        return logRepo.save(log);
    }

    @GetMapping("/{exerciseId}")
    public List<WorkoutLog> getLogs(@PathVariable int exerciseId) {
        return logRepo.findByExerciseId(exerciseId);
    }
}
