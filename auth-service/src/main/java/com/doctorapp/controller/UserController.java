package com.doctorapp.controller;

import com.doctorapp.dto.*;
import com.doctorapp.entity.User;
import com.doctorapp.security.JwtUtil;
import com.doctorapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/doctor_service")
public class UserController {




    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> Register(@RequestBody  RegisterRequest dto) {

        try {

            User user = new User();
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            user.setRole(dto.getRole());
            user.setPassword(dto.getPassword());

            User savedUser = userService.registerUser(user);

            RegisterResponse registerResponse = new RegisterResponse();

            registerResponse.setId(savedUser.getId());
            registerResponse.setName(savedUser.getName());
            registerResponse.setEmail(savedUser.getEmail());
            registerResponse.setRole(savedUser.getRole());


                // Api Response for Success ful
            ApiResponse<RegisterResponse> apiResponse = new ApiResponse<>();
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Registration successful");
            apiResponse.setData(registerResponse);

            return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);


        } catch (Exception e) {
            ApiResponse<RegisterResponse> apiResponse = new ApiResponse<>();
            apiResponse.setSuccess(false);
            apiResponse.setMessage(e.getMessage());
            apiResponse.setData(null);

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);

        }


        }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody LoginRequest loginRequest) {

        try {
            User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

            // ✅ generate token with userId
            String token = JwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

            ApiResponse<String> apiResponse = new ApiResponse<>();
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Login successful");
            apiResponse.setData(token);

            return ResponseEntity.ok(apiResponse);

        } catch (Exception e) {

            ApiResponse<String> apiResponse = new ApiResponse<>();
            apiResponse.setSuccess(false);
            apiResponse.setMessage(e.getMessage());
            apiResponse.setData(null);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponse);
        }
    }






}






