package com.appointment_service.config;


import com.appointment_service.security.JwtFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{

        http.csrf(csrf-> csrf.disable())
                .authorizeHttpRequests(auth->auth.requestMatchers("/api/appointments/book").authenticated()
                        .requestMatchers("/api/appointments/doctor/**").authenticated().anyRequest().permitAll())

                .addFilterBefore(new JwtFilter(),org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

                return http.build();



    }
}
