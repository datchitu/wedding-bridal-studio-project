package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndDeleted(String email, boolean deleted);

    List<User> findAllByDeleted(boolean deleted);

    Optional<User> findByIdAndDeleted(Long id, boolean deleted);
}
