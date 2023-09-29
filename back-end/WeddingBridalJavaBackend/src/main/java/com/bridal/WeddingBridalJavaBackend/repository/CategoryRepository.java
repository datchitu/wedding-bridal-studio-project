package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
//    Option 1
    List<Category> findByNameContaining(String name);
//    Option 2
//    List<Category> findByNameLike(String name);

//    Option 1
//    List<Category> findAllNotDeleted();
//    List<Category> findAllDeleted();
//    Option 2
    List<Category> findAllByDeleted(boolean deleted);
}
