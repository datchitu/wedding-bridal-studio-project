package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ServiceService {
    Service findServiceById(Long id);

    Optional<Service> findByName(String name);

    List<Service> searchByName(String name);

    List<Service> findAllServiceByCategoryId(Long categoryId);

    List<Service> findAllServiceByCategoryIdByDeleted(Long categoriesId, Boolean deleted);

    List<Service> getAllService();

    List<Service> getAllServiceByDeleted(Boolean deleted);

    Service addService(Map<String, Object> newService, Category category);

    Service updateService(Long id, Map<String, Object> newService);

    Service deleteService(Long id);

    Service activeService(Long id);
}
