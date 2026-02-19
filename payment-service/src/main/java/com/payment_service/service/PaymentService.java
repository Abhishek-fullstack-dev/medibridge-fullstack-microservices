package com.payment_service.service;

import com.payment_service.entity.Payment;

import java.util.List;

public interface PaymentService {

    Payment makePayment(Payment payment);

    List<Payment> getPatientPayments(Long patientId);

    List<Payment> getDoctorPayments(Long doctorId);

    Payment getByAppointmentId(Long appointmentId);
}
