package com.doctor_service.service;


import com.doctor_service.entity.Doctor;
import com.doctor_service.repository.DoctorRepository;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService{



    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;



    }

    public Doctor createProfile(Doctor doctor){

        if (doctorRepository.findByUserId(doctor.getUserId()).isPresent()) {
            throw new RuntimeException("Doctor profile already exists for this user");
        }
        return doctorRepository.save(doctor);
    }

    public Doctor getDoctorByUserId(Long UserId){
        return doctorRepository.findByUserId(UserId).orElse(null);
    }


}
