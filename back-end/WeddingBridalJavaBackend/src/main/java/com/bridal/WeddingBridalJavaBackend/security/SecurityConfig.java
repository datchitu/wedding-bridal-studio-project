package com.bridal.WeddingBridalJavaBackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, UserDetailsService userDetailsService,
                                                   JwtAuthFilter filter) throws Exception {
        return httpSecurity
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/login", "/users"/*, "/users/change-password"*/,"/categories", "/categories/get-category-by-id", "/services",
                        "/services/get-service-by-id", "/services/get-all-service-by-category-id-and-deleted",
                        "/services/search-service-by-name", "/variant-services",
                        "/variant-services/get-variant-service-by-id",
                        "/variant-services/get-all-variant-service-by-service-id-and-deleted",
                        "/variant-services/search-variant-service-by-name-and-deleted", "/transactions",
                        "/transactions/get-transaction-by-id-and-deleted","/transactions/order",
                        "/transactions/payment", "/transactions/update",
                        "/transactions/add-to-transaction", "/transactions/set-total-price-empty-transaction",
                        "/transactions/set-total-price-empty-transaction", "/transactions/get-transaction-by-false-status",
                        "/transaction-line-items/**", "/transaction-users",
                        "/vouchers", "/vouchers/get-voucher-by-id", "/vouchers/get-voucher-by-code", "/vouchers/check-voucher-by-code"
                        , "/vouchers/get-voucher-by-name")
                .permitAll()
                .and()
                .authorizeHttpRequests()
                .requestMatchers( "/users/**","/categories/**", "/services/**",
                        "/transactions/**", "/variant-services/**", "/vouchers/**",
                        "/transaction-users/**", "/roles")
                .hasAnyRole("ADMIN", "USER", "STAFF", "PHOTOGRAPHER")
                .and()
                .authorizeHttpRequests()
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider(userDetailsService))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class).build();
    }
}
