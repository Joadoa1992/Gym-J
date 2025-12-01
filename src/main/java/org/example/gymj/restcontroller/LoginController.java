package org.example.gymj.restcontroller;

import jakarta.servlet.http.HttpSession;
import org.example.gymj.model.User;
import org.example.gymj.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    // Create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Single login method (MERGED)
    @PostMapping("/login")
    public User loginUser(@RequestBody User loginData, HttpSession session) {
        User user = userRepository.findByUsername(loginData.getUsername());

        if (user != null && user.getPassword().equals(loginData.getPassword())) {

            // Save user in session
            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getUsername());

            return user;
        }

        return null;
    }

    // Check session
    @GetMapping("/session")
    public User checkSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) return null;

        return userRepository.findById(userId).orElse(null);
    }

    // Logout
    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
