package com.appointment_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtUtil {

    private static final String SECRET = "doctorapp_secret_key_do_not_share";

    public static Claims extractClaims(String token){

        return Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();



    }

    public static String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public static String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }
}
