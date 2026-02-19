package com.appointment_service.service;

import com.appointment_service.entity.Appointment;
import com.appointment_service.enums.AppointmentStatus;

import java.util.List;

public interface AppointmentService {

    Appointment bookAppointment(Appointment appointment);

    List<Appointment> getAppointmentsByDoctor(Long doctorId);

    List<Appointment> getAppointmentsByPatient(Long patientId);

    Appointment updateStatus(Long appointmentId, AppointmentStatus status);
}

