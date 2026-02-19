package com.appointment_service.repository;

import com.appointment_service.entity.Appointment;
import com.appointment_service.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {


    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime
    );

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientId(Long patientId);
    List<Appointment>findByDoctorIdAndStatus(Long doctorId, AppointmentStatus status);

    List<Appointment>findByPatientIdAndStatus(Long patientId, AppointmentStatus status);
}
