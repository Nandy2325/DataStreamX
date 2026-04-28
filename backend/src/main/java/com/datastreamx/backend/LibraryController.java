package com.datastreamx.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LibraryController {

    // ✅ Full Library (your .mpeg songs for search)
  private static final List<Map<String, String>> allSongs = new ArrayList<>(Arrays.asList(
    Map.of("id","1","title","Blinding Lights","artist","The Weeknd","url","http://localhost:8080/songs/WEEKEND.mpeg","cover","https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"),
    Map.of("id","2","title","Levitating","artist","Dua Lipa","url","http://localhost:8080/songs/L.mpeg","cover","http://localhost:8080/covers/LEV.png"),
    Map.of("id","3","title","Starboy","artist","The Weeknd","url","http://localhost:8080/songs/WE.mpeg","cover","https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"),
    Map.of("id","4","title","Pavazha Malli","artist","Sai Abhyankkar ft. Shruti Haasan","url","http://localhost:8080/songs/PM.mpeg","cover","http://localhost:8080/covers/PAAV.png"),
    Map.of("id","5","title","Mutta Kalaki","artist","GV Prakash Kumar","url","http://localhost:8080/songs/MK.mpeg","cover","http://localhost:8080/covers/MUT.png"),
    Map.of("id","6","title","Dance on the Floor","artist","Jennifer Lopez","url","http://localhost:8080/songs/DF.mpeg","cover","http://localhost:8080/covers/JenniferLopez.jpg"),
    Map.of("id","7","title","Enna Solla","artist","Anirudh Ravichander","url","http://localhost:8080/songs/ES.mpeg","cover","http://localhost:8080/covers/enna solla.jpg"),
    Map.of("id","8","title","Kaavalaiya","artist","Anirudh Ravichander","url","http://localhost:8080/songs/KAA.mpeg","cover","http://localhost:8080/covers/kavalaya.jpg"),
    Map.of("id","9","title","Munbe Va","artist","A.R. Rahman","url","http://localhost:8080/songs/MV.mpeg","cover","http://localhost:8080/covers/munbe vaa.jpg"),
    Map.of("id","10","title","Mental Manadhil","artist","A.R. Rahman","url","http://localhost:8080/songs/MM.mpeg","cover","http://localhost:8080/covers/okk.jpg"),
    Map.of("id","11","title","New York Nagaram","artist","A.R. Rahman","url","http://localhost:8080/songs/NN.mpeg","cover","http://localhost:8080/covers/newyork.jpg"),
    Map.of("id","12","title","Ranjithame","artist","Thaman S","url","http://localhost:8080/songs/RANJI.mpeg","cover","http://localhost:8080/covers/ranjithame.jpg"),
    Map.of("id","13","title","Shape of You","artist","Ed Sheeran","url","http://localhost:8080/songs/SOY.mpeg","cover","http://localhost:8080/covers/sheeran.png"),
    Map.of("id","14","title","Unnakul Naane","artist","Madhu Shree","url","http://localhost:8080/songs/UN.mpeg","cover","http://localhost:8080/covers/unakul.jpg"),
    Map.of("id","15","title","Vaseegara","artist","Harris Jayaraj","url","http://localhost:8080/songs/V.mpeg","cover","http://localhost:8080/covers/vaseegra.jpg")
));

    // ✅ Endpoint for All Songs (used by search)
    @GetMapping("/library")
    public List<Map<String, String>> getAllSongs() {
        return allSongs;
    }

    // ✅ Static resource mapping
    @Configuration
    public static class WebConfig implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/songs/**")
                    .addResourceLocations("classpath:/static/songs/");
            registry.addResourceHandler("/covers/**")
                    .addResourceLocations("classpath:/static/covers/");
        }
    }
}