package com.doctorapp.service;

import com.doctorapp.entity.User;

public interface UserService {

    User registerUser(User User);

    User getUserByEmail(String email);

    User login(String email,String password);
}
