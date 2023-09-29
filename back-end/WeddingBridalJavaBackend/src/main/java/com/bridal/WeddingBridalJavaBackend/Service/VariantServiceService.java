package com.bridal.WeddingBridalJavaBackend.Service;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface VariantServiceService {
    VariantService findVariantServiceById(Long id);

    Optional<VariantService> findByName(String name);

    List<VariantService> searchByNameAndDeleted(String name, Boolean deleted);

    List<VariantService> findAllVariantServiceByServiceId(Long serviceId);

    public List<VariantService> searchByName(String name);

    List<VariantService> findAllVariantServiceByServiceIdAndDeleted(Long servicesId, Boolean deleted);

    List<VariantService> getAllVariantService();

    List<VariantService> getAllVariantServiceByDeleted(Boolean deleted);

    VariantService addVariantService(Map<String, Object> newVariantService, Service service);

    VariantService updateVariantService(Long id, Map<String, Object> newVariantService);

    VariantService deleteVariantService(Long id);

    VariantService activeVariantService(Long id);
}
