package com.payment_service.service;

import com.payment_service.entity.Payment;
import com.payment_service.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment makePayment(Payment payment) {

        // Mock payment gateway
        payment.setTransactionId(UUID.randomUUID().toString());

        payment.setStatus("SUCCESS");
        payment.setPaymentTime(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getPatientPayments(Long patientId) {
        return paymentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Payment> getDoctorPayments(Long doctorId) {
        return paymentRepository.findByDoctorId(doctorId);
    }

    @Override
    public Payment getByAppointmentId(Long appointmentId) {
        return paymentRepository.findByAppointmentId(appointmentId);
    }
}
