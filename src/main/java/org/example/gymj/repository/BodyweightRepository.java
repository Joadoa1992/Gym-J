package org.example.gymj.repository;

import org.example.gymj.model.Bodyweight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BodyweightRepository extends JpaRepository<Bodyweight, Integer> {
    List<Bodyweight> findByUserId(Integer userId);
}
