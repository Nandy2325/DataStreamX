package com.datastreamx.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SongController {

    private static List<Map<String, String>> songs = new ArrayList<>(Arrays.asList(
        Map.of(
            "id", "1",
            "title", "Blinding Lights",
            "artist", "The Weeknd",
            "url", "http://localhost:8080/songs/WEEKEND.mpeg",
            "cover", "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
        ),
        Map.of(
            "id", "2",
            "title", "Levitating",
            "artist", "Dua Lipa",
            "url", "http://localhost:8080/songs/L.mpeg",
            "cover", "http://localhost:8080/covers/LEV.png"
        ),
        Map.of(
            "id", "3",
            "title", "Starboy",
            "artist", "The Weeknd",
            "url", "http://localhost:8080/songs/WE.mpeg",
            "cover", "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
        ),
        Map.of(
    "id", "4",
    "title", "Pavazha Malli",
    "artist", "Sai Abhyankkar ft. Shruti Haasan",
    "url", "http://localhost:8080/songs/PM.mpeg", // placeholder
    "cover", "http://localhost:8080/covers/PAAV.png"
),
Map.of(
    "id", "5",
    "title", "Mutta Kalaki",
    "artist", "GV Prakash Kumar",
    "url", "http://localhost:8080/songs/MK.mpeg", // placeholder
    "cover", "http://localhost:8080/covers/MUT.png"
)
    ));

    @GetMapping("/songs")
    public List<Map<String, String>> getAllSongs() {
        return songs;
    }

    @Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/songs/**")
                .addResourceLocations("classpath:/static/songs/");
        registry.addResourceHandler("/covers/**")
                .addResourceLocations("classpath:/static/covers/");
    }
}
}