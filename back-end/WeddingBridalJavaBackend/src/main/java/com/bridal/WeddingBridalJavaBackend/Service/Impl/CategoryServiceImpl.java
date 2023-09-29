package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.CategoryService;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
public class CategoryServiceImpl implements CategoryService {
    private Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());
//    Timestamp ts = Timestamp.from(new Date().toInstant());

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category findCategoryById(Long id) {
        return this.categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<Category> findByName(String name) {
        return this.categoryRepository.findByName(name);
    }

    @Override
    public List<Category> searchByName(String name) {
        return this.categoryRepository.findByNameContaining(name);
    }

    @Override
    public List<Category> getAllCategory() {
        return this.categoryRepository.findAll();
    }
    @Override
    public List<Category> getAllCategoryByDeleted(Boolean deleted) {
        return this.categoryRepository.findAllByDeleted(deleted);
    }

    @Override
    public Category addCategory(Map<String, Object> newCategory) {
        Category category = new Category();
        category.setName(newCategory.get("name").toString());
        category.setDeleted(false);
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Map<String, Object> newCategory) {
        Category category = this.findCategoryById(id);
        category.setName(newCategory.get("name").toString());
        category.setUpdatedAt(ts);
        return this.categoryRepository.save(category);
    }

    @Override
    public Category deleteCategory(Long id) {
        Category category = this.findCategoryById(id);
        category.setDeleted(true);
        category.setUpdatedAt(ts);
        return this.categoryRepository.save(category);
    }

    @Override
    public Category activeCategory(Long id) {
        Category category = this.findCategoryById(id);
        category.setDeleted(false);
        category.setUpdatedAt(ts);
        return this.categoryRepository.save(category);
    }
}
