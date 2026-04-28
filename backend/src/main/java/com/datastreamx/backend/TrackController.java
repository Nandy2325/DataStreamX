package com.datastreamx.backend; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tracks") 
@CrossOrigin(origins = "http://localhost:3000") 
public class TrackController {
    
    @Autowired
    private TrackRepository trackRepository;

    @GetMapping
    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }
    
}