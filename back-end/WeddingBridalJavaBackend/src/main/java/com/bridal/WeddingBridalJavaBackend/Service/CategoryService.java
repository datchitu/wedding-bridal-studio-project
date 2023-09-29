package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.Category;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CategoryService {
    Category findCategoryById(Long id);

    Optional<Category> findByName(String name);

    List<Category> searchByName(String name);

    List<Category> getAllCategory();

    List<Category> getAllCategoryByDeleted(Boolean deleted);

    Category addCategory(Map<String, Object> newCategory);

    Category updateCategory(Long id, Map<String, Object> newCategory);

    Category deleteCategory(Long id);

    Category activeCategory(Long id);
}
