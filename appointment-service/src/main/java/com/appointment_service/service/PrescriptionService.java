package com.appointment_service.service;

import com.appointment_service.entity.Prescription;

import java.util.List;

public interface PrescriptionService {


    Prescription createPrescription(Prescription prescription);

    List<Prescription> getPatientPrescriptions(Long patientId);

    List<Prescription> getDoctorPrescriptions(Long doctorId);

    Prescription getByAppointmentId(Long appointmentId);
}
