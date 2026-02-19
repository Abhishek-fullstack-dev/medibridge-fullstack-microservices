package com.doctor_service.service;

import com.doctor_service.entity.Doctor;

public interface DoctorService  {

    Doctor createProfile(Doctor doctor);

    Doctor getDoctorByUserId(Long userId);

}
