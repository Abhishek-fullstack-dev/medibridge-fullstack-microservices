package com.doctorapp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "doctorapp_secret_key_do_not_share_do_not_share_123456";
    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ✅ Generate token with userId + role
    public static String generateToken(Long userId, String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract email
    public static String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // ✅ Extract role
    public static String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    // ✅ Extract userId
    public static Long extractUserId(String token) {
        return extractClaims(token).get("userId", Long.class);
    }

    // ✅ Validate token
    public static boolean validateToken(String token) {
        extractClaims(token); // throws exception if invalid
        return true;
    }

    private static Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
