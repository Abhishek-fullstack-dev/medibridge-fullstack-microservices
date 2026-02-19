package com.doctor_service.controller;


import com.doctor_service.dto.DoctorRequest;
import com.doctor_service.entity.Doctor;
import com.doctor_service.service.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/profile")
    public ResponseEntity<?> createProfile(@RequestBody DoctorRequest request,
                                           HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");
        Long userId = (Long) httpRequest.getAttribute("userId");

        // 🔒 Only doctors can create profile
        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only doctors can create profile");
        }

        Doctor doctor = new Doctor();

        // ✅ userId from JWT, not frontend
        doctor.setUserId(userId);

        doctor.setQualification(request.getQualification());
        doctor.setAvailableFrom(request.getAvailableFrom());
        doctor.setAvailableTo(request.getAvailableTo());
        doctor.setConsultationFee(request.getConsultationFee());
        doctor.setExperience(request.getExperience());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setHospitalName(request.getHospitalName());

        Doctor savedDoctor = doctorService.createProfile(doctor);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedDoctor);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");
        Long userId = (Long) httpRequest.getAttribute("userId");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only doctors can access profile");
        }

        Doctor doctor = doctorService.getDoctorByUserId(userId);
        return ResponseEntity.ok(doctor);
    }

}
