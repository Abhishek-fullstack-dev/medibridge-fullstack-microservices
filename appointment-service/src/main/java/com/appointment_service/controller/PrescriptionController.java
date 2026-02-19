package com.appointment_service.controller;

import com.appointment_service.dto.PrescriptionRequest;
import com.appointment_service.entity.Prescription;
import com.appointment_service.service.PrescriptionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    // Doctor uploads prescription
    @PostMapping("/create")
    public ResponseEntity<?> createPrescription(
            @RequestBody PrescriptionRequest request,
            HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only doctors can create prescriptions");
        }

        Prescription prescription = new Prescription();
        prescription.setAppointmentId(request.getAppointmentId());
        prescription.setDoctorId(request.getDoctorId());
        prescription.setPatientId(request.getPatientId());
        prescription.setDiagnosis(request.getDiagnosis());
        prescription.setMedicines(request.getMedicines());
        prescription.setNotes(request.getNotes());
        prescription.setFollowUpDate(request.getFollowUpDate());

        Prescription saved = prescriptionService.createPrescription(prescription);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Patient views prescriptions
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.getPatientPrescriptions(patientId));
    }

    // Doctor views prescriptions
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>> getDoctorPrescriptions(@PathVariable Long doctorId) {
        return ResponseEntity.ok(prescriptionService.getDoctorPrescriptions(doctorId));
    }

    // View by appointment
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Prescription> getByAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(prescriptionService.getByAppointmentId(appointmentId));
    }
}
