package com.payment_service.repository;

import com.payment_service.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

    List<Payment>findByPatientId(Long patientId);
    List<Payment> findByDoctorId(Long doctorId);

    Payment findByAppointmentId(Long appointmentId);
}
