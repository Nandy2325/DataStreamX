package com.datastreamx.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ FETCH ALL: For the Admin Registry
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ SIGNUP: Now expects 'name', 'email', and 'password'
    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    // ✅ LOGIN: Standard credentials check
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email"); 
        String password = credentials.get("password");

        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .map(u -> "Login successful!")
                .orElse("Invalid credentials");
    }

    // ✅ DELETE: The logic for the "DE_AUTH" button in Admin Panel
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}