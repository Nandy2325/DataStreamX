package com.datastreamx.backend;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // Automatically generates getters, setters, toString, equals, and hashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // Added for the Admin Panel display

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
}