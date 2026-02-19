package com.patient_service.service;


import com.patient_service.entity.Patient;
import com.patient_service.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService{

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    private final PatientRepository patientRepository;

    @Override
    public Patient createOrUpdateProfile(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient getProfileByUserId(Long userId) {
        return patientRepository.findByUserId(userId).orElse(null);
    }

}
