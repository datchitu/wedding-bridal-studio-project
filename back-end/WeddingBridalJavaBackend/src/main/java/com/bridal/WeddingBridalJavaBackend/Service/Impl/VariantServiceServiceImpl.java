package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.VariantServiceService;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import com.bridal.WeddingBridalJavaBackend.repository.VariantServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;


import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@org.springframework.stereotype.Service
public class VariantServiceServiceImpl implements VariantServiceService {
            private Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());
    @Autowired
    private VariantServiceRepository variantServiceRepository;

    @Override
    public VariantService findVariantServiceById(Long id) {
        return this.variantServiceRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<VariantService> findByName(String name) {
        return this.variantServiceRepository.findByName(name);
    }
    @Override
    public List<VariantService> searchByName(String name) {
        return this.variantServiceRepository.findByNameContaining(name);
    }
    @Override
    public List<VariantService> searchByNameAndDeleted(String name, Boolean deleted) {
        return this.variantServiceRepository.findByNameContainingAndDeleted(name, deleted);
    }
    @Override
    public List<VariantService> findAllVariantServiceByServiceId(Long servicesId) {
        return this.variantServiceRepository.findByService_Id(servicesId);
    }

    @Override
    public List<VariantService> findAllVariantServiceByServiceIdAndDeleted(Long servicesId, Boolean deleted) {
        return this.variantServiceRepository.findByService_IdAndDeleted(servicesId, deleted);
    }

    @Override
    public List<VariantService> getAllVariantService() {
        return this.variantServiceRepository.findAll();
    }

    @Override
    public List<VariantService> getAllVariantServiceByDeleted(Boolean deleted) {
        return this.variantServiceRepository.findAllByDeleted(deleted);
    }

    @Override
    public VariantService addVariantService(Map<String, Object> newVariantService, Service service) {
        VariantService variantService = new VariantService();
        variantService.setName(newVariantService.get("name").toString());
        variantService.setPrice(Double.parseDouble(newVariantService.get("price").toString()));
        variantService.setDescription(newVariantService.get("description").toString());
        variantService.setAvatar(newVariantService.get("avatar").toString());
        variantService.setQuantity(Integer.parseInt(newVariantService.get("quantity").toString()));
        variantService.setDeleted(false);
        variantService.setService(service);
        variantService.setAvatar("./images/avatar-default.jpg");
        return this.variantServiceRepository.save(variantService);
    }

    @Override
    public VariantService updateVariantService(Long id, Map<String, Object> newVariantService) {
        VariantService variantService = this.findVariantServiceById(id);
        variantService.setName(newVariantService.get("name").toString());
        variantService.setPrice(Double.parseDouble(newVariantService.get("price").toString()));
        variantService.setDescription(newVariantService.get("description").toString());
        variantService.setAvatar(newVariantService.get("avatar").toString());
        variantService.setQuantity(Integer.parseInt(newVariantService.get("quantity").toString()));
        variantService.setUpdatedAt(ts);
        return this.variantServiceRepository.save(variantService);
    }

    @Override
    public VariantService deleteVariantService(Long id) {
        VariantService variantService = this.findVariantServiceById(id);
        variantService.setDeleted(true);
        variantService.setUpdatedAt(ts);
        return this.variantServiceRepository.save(variantService);
    }

    @Override
    public VariantService activeVariantService(Long id) {
        VariantService variantService = this.findVariantServiceById(id);
        variantService.setDeleted(false);
        variantService.setUpdatedAt(ts);
        return this.variantServiceRepository.save(variantService);
    }
}
