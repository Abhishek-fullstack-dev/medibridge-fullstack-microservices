package com.payment_service.controller;

import com.payment_service.dto.PaymentRequest;
import com.payment_service.entity.Payment;
import com.payment_service.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Make payment (PATIENT)
    @PostMapping("/pay")
    public ResponseEntity<?> makePayment(
            @RequestBody PaymentRequest request,
            HttpServletRequest httpRequest) {

        String role = (String) httpRequest.getAttribute("role");

        if (!"PATIENT".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only patients can make payments");
        }

        Payment payment = new Payment();
        payment.setAppointmentId(request.getAppointmentId());
        payment.setDoctorId(request.getDoctorId());
        payment.setPatientId(request.getPatientId());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());

        Payment saved = paymentService.makePayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Patient payment history
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Payment>> getPatientPayments(@PathVariable Long patientId) {
        return ResponseEntity.ok(paymentService.getPatientPayments(patientId));
    }

    // Doctor earnings
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Payment>> getDoctorPayments(@PathVariable Long doctorId) {
        return ResponseEntity.ok(paymentService.getDoctorPayments(doctorId));
    }

    // Appointment invoice
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Payment> getPaymentByAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(paymentService.getByAppointmentId(appointmentId));
    }
}
