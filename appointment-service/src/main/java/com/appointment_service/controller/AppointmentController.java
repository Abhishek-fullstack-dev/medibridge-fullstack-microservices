package com.appointment_service.controller;

import com.appointment_service.dto.AppointmentRequest;
import com.appointment_service.entity.Appointment;
import com.appointment_service.enums.AppointmentStatus;
import com.appointment_service.service.AppointmentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // ---------------- Book Appointment (PATIENT) ----------------

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(
            @RequestBody AppointmentRequest request,
            HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");

        if (!"PATIENT".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only patients can book appointments");
        }

        try {
            Appointment appointment = new Appointment();
            appointment.setPatientId(request.getPatientId());
            appointment.setDoctorId(request.getDoctorId());
            appointment.setAppointmentDate(LocalDate.parse(request.getAppointmentDate()));
            appointment.setAppointmentTime(LocalTime.parse(request.getAppointmentTime()));

            Appointment saved = appointmentService.bookAppointment(appointment);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ---------------- Doctor Schedule (DOCTOR) ----------------

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<?> getDoctorAppointments(
            @PathVariable Long doctorId,
            HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only doctors can view their schedule");
        }

        List<Appointment> appointments = appointmentService.getAppointmentsByDoctor(doctorId);
        return ResponseEntity.ok(appointments);
    }

    // ---------------- Patient History (PATIENT) ----------------

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getPatientAppointments(
            @PathVariable Long patientId,
            HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");

        if (!"PATIENT".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only patients can view their appointments");
        }

        List<Appointment> appointments = appointmentService.getAppointmentsByPatient(patientId);
        return ResponseEntity.ok(appointments);
    }

    // ---------------- Update Appointment Status ----------------
    // Used by payment-service or doctor after completion

    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long appointmentId,
            @RequestParam AppointmentStatus status,
            HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");

        if (!"DOCTOR".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only doctors can update appointment status");
        }

        Appointment updated = appointmentService.updateStatus(appointmentId, status);
        return ResponseEntity.ok(updated);
    }
}
