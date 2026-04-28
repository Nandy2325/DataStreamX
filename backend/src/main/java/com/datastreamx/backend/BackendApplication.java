package com.datastreamx.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // This runs automatically every time the backend starts
    @Bean
    CommandLineRunner initDatabase(TrackRepository repository) {
        return args -> {
            Track t1 = new Track();
            t1.setTitle("Blinding Lights");
            t1.setArtist("The Weeknd");
            t1.setDuration("3:20");
            repository.save(t1);

            Track t2 = new Track();
            t2.setTitle("Levitating");
            t2.setArtist("Dua Lipa");
            t2.setDuration("3:23");
            repository.save(t2);

            System.out.println("Sample tracks added to database!");
        };
    }
}