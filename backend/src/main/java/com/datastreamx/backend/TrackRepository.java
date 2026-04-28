package com.datastreamx.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
    // This gives us findAll(), findById(), etc. automatically!
}