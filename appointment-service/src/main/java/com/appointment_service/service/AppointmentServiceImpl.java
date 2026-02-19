package com.appointment_service.service;

import com.appointment_service.entity.Appointment;
import com.appointment_service.enums.AppointmentStatus;
import com.appointment_service.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService{

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    private final AppointmentRepository appointmentRepository;

    @Override
    public Appointment bookAppointment(Appointment appointment) {
        Long doctorId = appointment.getDoctorId();
        LocalDate date=appointment.getAppointmentDate();
        LocalTime time=appointment.getAppointmentTime();

       boolean exists= appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(doctorId, date, time);

       if(exists){
           throw new RuntimeException("This slot is already booked. Please choose another time.");

       }
        appointment.setStatus(AppointmentStatus.BOOKED);

        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }


    public Appointment updateStatus(Long appointmentId, AppointmentStatus status) {

        Appointment appointment= appointmentRepository.findById(appointmentId).orElseThrow(()-> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);
        return appointmentRepository.save(appointment);

    }
}
