package com.patient_service.service;

import com.patient_service.entity.Patient;

public interface PatientService {

    Patient createOrUpdateProfile(Patient patient);

    Patient getProfileByUserId(Long userId);
}
