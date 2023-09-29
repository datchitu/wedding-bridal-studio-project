package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface VariantServiceRepository extends JpaRepository<VariantService, Long> {
    Optional<VariantService> findByName(String name);
    List<VariantService> findByService_Id(Long servicesId);
    List<VariantService> findByNameContaining(String name);
    List<VariantService> findByNameContainingAndDeleted(String name, Boolean deleted);
    List<VariantService> findByService_IdAndDeleted(Long servicesId, Boolean deleted);

    List<VariantService> findAllByDeleted(boolean deleted);
}
