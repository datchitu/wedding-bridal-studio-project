package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Optional<Service> findByName(String name);
    List<Service> findByCategorie_Id(Long categoriesId);

    List<Service> findByCategorie_IdAndDeleted(Long categoriesId, Boolean deleted);
    List<Service> findByNameContaining(String name);
    List<Service> findAllByDeleted(boolean deleted);
}
