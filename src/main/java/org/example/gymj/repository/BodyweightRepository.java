package org.example.gymj.repository;

import org.example.gymj.model.Bodyweight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface BodyweightRepository extends JpaRepository<Bodyweight, Long> {
}
