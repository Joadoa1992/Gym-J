package org.example.gymj.service;

import org.example.gymj.repository.BodyweightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BodyweightService {

    @Autowired
    BodyweightRepository bodyweightRepository;


}
