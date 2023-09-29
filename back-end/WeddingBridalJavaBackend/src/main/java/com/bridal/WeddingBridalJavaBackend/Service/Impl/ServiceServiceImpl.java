package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.ServiceService;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {
    Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public Service findServiceById(Long id) {
        return this.serviceRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<Service> findByName(String name) {
        return this.serviceRepository.findByName(name);
    }

    @Override
    public List<Service> searchByName(String name) {
        return this.serviceRepository.findByNameContaining(name);
    }

    @Override
    public List<Service> findAllServiceByCategoryId(Long categoriesId) {
        return this.serviceRepository.findByCategorie_Id(categoriesId);
    }

    @Override
    public List<Service> findAllServiceByCategoryIdByDeleted(Long categoriesId, Boolean deleted) {
        return this.serviceRepository.findByCategorie_IdAndDeleted(categoriesId, deleted);
    }

    @Override
    public List<Service> getAllService() {
        return this.serviceRepository.findAll();
    }

    @Override
    public List<Service> getAllServiceByDeleted(Boolean deleted) {
        return this.serviceRepository.findAllByDeleted(deleted);
    }

    @Override
    public Service addService(Map<String, Object> newService, Category category) {
        Service service = new Service();
        service.setName(newService.get("name").toString());
        service.setDeleted(false);
        service.setCategorie(category);
        return this.serviceRepository.save(service);
    }

    @Override
    public Service updateService(Long id, Map<String, Object> newService) {
        Service service = this.findServiceById(id);
        service.setName(newService.get("name").toString());
        service.setUpdatedAt(ts);
        return this.serviceRepository.save(service);
    }

    @Override
    public Service deleteService(Long id) {
        Service service = this.findServiceById(id);
        service.setDeleted(true);
        service.setUpdatedAt(ts);
        return this.serviceRepository.save(service);
    }

    @Override
    public Service activeService(Long id) {
        Service service = this.findServiceById(id);
        service.setDeleted(false);
        service.setUpdatedAt(ts);
        return this.serviceRepository.save(service);
    }
}
