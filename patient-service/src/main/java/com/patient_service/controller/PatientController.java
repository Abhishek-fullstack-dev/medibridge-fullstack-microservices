package com.patient_service.controller;

import com.patient_service.dto.PatientRequest;
import com.patient_service.entity.Patient;
import com.patient_service.service.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // ---------------- CREATE / UPDATE PROFILE ----------------

    @PostMapping("/profile")
    public ResponseEntity<Patient> createOrUpdateProfile(
            @RequestBody PatientRequest request,
            HttpServletRequest httpRequest) {

        System.out.println("CONTROLLER HIT");

        String role = (String) httpRequest.getAttribute("role");
        Long userId = (Long) httpRequest.getAttribute("userId");

        System.out.println("ROLE FROM JWT = " + role);
        System.out.println("USER ID FROM JWT = " + userId);

        if (!"PATIENT".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Patient patient = new Patient();
        patient.setUserId(userId);   // ✅ secure source
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
        patient.setMedicalHistory(request.getMedicalHistory());
        patient.setAllergies(request.getAllergies());
        patient.setChronicDiseases(request.getChronicDiseases());

        Patient saved = patientService.createOrUpdateProfile(patient);
        return ResponseEntity.ok(saved);
    }

    // ---------------- GET PROFILE (JWT BASED) ----------------

    @GetMapping("/profile")
    public ResponseEntity<Patient> getProfile(HttpServletRequest httpRequest) {

        Long userId = (Long) httpRequest.getAttribute("userId");
        Patient patient = patientService.getProfileByUserId(userId);

        return ResponseEntity.ok(patient);
    }
}
