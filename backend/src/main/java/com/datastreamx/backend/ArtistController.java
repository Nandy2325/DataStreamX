package com.datastreamx.backend;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api") // <--- THIS WAS MISSING!
@CrossOrigin(origins = "http://localhost:3000")
public class ArtistController {

    private static List<Map<String, String>> artists = new ArrayList<>(new ArrayList<>(Arrays.asList(
        Map.of("name", "Anirudh", "image", "Anirudh"),
Map.of("name", "Shreya Ghoshal", "image", "ShreyaGhoshal"),
Map.of("name", "BTS", "image", "BTS"),
Map.of("name", "BLACKPINK", "image", "BP"),
Map.of("name", "Billie Eilish", "image", "billie")
    )));

    @GetMapping("/artists")
    public List<Map<String, String>> getArtists() {
        return artists;
    }

    @PostMapping("/artists/follow")
    public List<Map<String, String>> followArtist(@RequestBody Map<String, String> newArtist) {
        artists.add(newArtist); 
        return artists; 
    }
}