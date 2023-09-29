package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.CategoryService;
import com.bridal.WeddingBridalJavaBackend.Service.Impl.CategoryServiceImpl;
import com.bridal.WeddingBridalJavaBackend.Service.ServiceService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.CategoryDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.ServiceDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.VariantServiceDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/services")
public class ServiceController extends BaseRestController{
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllService(@RequestParam(defaultValue = "-1") Integer status){
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            List<Service> services;
            if (status == -1) {
                services = this.serviceService.getAllService();
            } else if (status == 0) {
                services = this.serviceService.getAllServiceByDeleted(false);
            } else {
                services = this.serviceService.getAllServiceByDeleted(true);
            }
            List<ServiceDTOResponse> responses = services.stream()
                    .map(service -> new ServiceDTOResponse(service))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

        @GetMapping("/get-service-by-id")
    public ResponseEntity<?> getServiceById(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        Service foundService = this.serviceService.findServiceById(id);
        if (ObjectUtils.isEmpty(foundService)) {
            return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
        }
        return super.success(new ServiceDTOResponse(foundService));
    }

    @GetMapping("/get-all-service-by-category-id-and-deleted")
    public ResponseEntity<?> getAllServiceByCategoryIdAndDeleted(@RequestParam(name = "categoriesId", defaultValue = "1") Long categoriesId,
                                                        @RequestParam(defaultValue = "-1") Integer status) {
        try {
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Category foundCategory = this.categoryService.findCategoryById(categoriesId);
            if (ObjectUtils.isEmpty(foundCategory)) {
                return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
            }
            List<Service> foundServices;
            if (status == -1) {
                foundServices = this.serviceService.findAllServiceByCategoryId(categoriesId);
            } else if (status == 0) {
                foundServices = this.serviceService.findAllServiceByCategoryIdByDeleted(categoriesId,false);
            } else {
                foundServices = this.serviceService.findAllServiceByCategoryIdByDeleted(categoriesId,true);
            }
            List<Service> services = foundServices;
            List<ServiceDTOResponse> responses = services.stream()
                    .map(service -> new ServiceDTOResponse(service))
                    .collect(Collectors.toList());
            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> addService(@RequestBody(required = true) Map<String, Object> newService){
        try{
            if(ObjectUtils.isEmpty(newService)
                    || ObjectUtils.isEmpty(newService.get("name"))
                    || ObjectUtils.isEmpty(newService.get("categoriesId"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }

            Service foundService = this.serviceService.findByName(newService.get("name").toString()).orElse(null);
            if(!ObjectUtils.isEmpty(foundService)){
                return super.error(ResponseCode.DATA_ALREADY_EXISTS.getCode(),
                        ResponseCode.DATA_ALREADY_EXISTS.getMessage());
            }

            Long categoryId = Long.parseLong(newService.get("categoriesId").toString());
            Category foundCategory = this.categoryService.findCategoryById(categoryId);
            if (ObjectUtils.isEmpty(foundCategory)) {
                return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
            }

            Service insertedService = serviceService.addService(newService, foundCategory);
            return super.success(new ServiceDTOResponse(insertedService));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> updateService(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                           @RequestBody(required = false) Map<String, Object> newService){
        try{
            if(ObjectUtils.isEmpty(newService)
                    || ObjectUtils.isEmpty(newService.get("name"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }

            Service foundService = this.serviceService.findServiceById(id);
            if (ObjectUtils.isEmpty(foundService)) {
                return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
            }

            Service updatedService = serviceService.updateService(id, newService);
            return super.success(new ServiceDTOResponse(updatedService));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteService(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            Service foundService = this.serviceService.findServiceById(id);
            if (ObjectUtils.isEmpty(foundService)) {
                return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
            }
            if (foundService.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            Service deletedService = serviceService.deleteService(id);
            return super.success(new ServiceDTOResponse(deletedService));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/active")
    public ResponseEntity<?> activeService(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            Service foundService = this.serviceService.findServiceById(id);
            if (ObjectUtils.isEmpty(foundService)) {
                return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
            }
            if (foundService.getDeleted().equals(false)) {
                return super.error(ResponseCode.ACTIVED.getCode(), ResponseCode.ACTIVED.getMessage());
            }
            Service activeService = serviceService.activeService(id);
            return super.success(new ServiceDTOResponse(activeService));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/search-service-by-name")
    public ResponseEntity<?> searchServiceByName(@RequestParam String name,
                                               @RequestBody(required = false) Map<String, Object> newService) {
        try {
            List<Service> foundService = this.serviceService.searchByName(name);
            if (ObjectUtils.isEmpty(foundService)) {
                return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
            }
            List<ServiceDTOResponse> responses = foundService.stream()
                    .map(service -> new ServiceDTOResponse(service))
                    .collect(Collectors.toList());
            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}
