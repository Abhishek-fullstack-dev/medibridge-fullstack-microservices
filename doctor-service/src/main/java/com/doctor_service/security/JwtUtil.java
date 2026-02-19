package com.doctor_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class JwtUtil {

    private static final String SECRET = "doctorapp_secret_key_do_not_share_do_not_share_123456";
    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public static Long extractUserId(String token) {
        return extractClaims(token).get("userId", Long.class);
    }

    private static Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
