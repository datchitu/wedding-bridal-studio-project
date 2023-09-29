package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.ServiceService;
import com.bridal.WeddingBridalJavaBackend.Service.VariantServiceService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
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

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/variant-services")
public class VariantServiceController extends BaseRestController{
    @Autowired
    VariantServiceService variantServiceService;
    @Autowired
    ServiceService serviceService;

    @GetMapping("")
    public ResponseEntity<?> getAllVariantService(@RequestParam(defaultValue = "-1") Integer status,
                                                  @RequestParam(defaultValue = "0") Integer offset,
                                                  @RequestParam(defaultValue = "4") Integer limit){
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }
            List<VariantService> variantServices;
            if (status == -1) {
                variantServices = this.variantServiceService.getAllVariantService();
            } else if (status == 0) {
                variantServices = this.variantServiceService.getAllVariantServiceByDeleted(false);
            } else {
                variantServices = this.variantServiceService.getAllVariantServiceByDeleted(true);
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), variantServices.size());
            variantServices = variantServices.subList(startIndex, endIndex);
            List<VariantServiceDTOResponse> responses = variantServices.stream()
                    .map(variantService -> new VariantServiceDTOResponse(variantService))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-variant-service-by-id")
    public ResponseEntity<?> getVariantServiceById(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        VariantService foundVariantService = this.variantServiceService.findVariantServiceById(id);
        if (ObjectUtils.isEmpty(foundVariantService)) {
            return super.error(ResponseCode.VARIANT_SERVICE_NOT_FOUND.getCode(), ResponseCode.VARIANT_SERVICE_NOT_FOUND.getMessage());
        }
        return super.success(new VariantServiceDTOResponse(foundVariantService));
    }

    @GetMapping("/get-all-variant-service-by-service-id-and-deleted")
    public ResponseEntity<?> getAllVariantServiceByServiceIdAndDeleted(@RequestParam(name = "servicesId", defaultValue = "1") Long serviceId,
                                                             @RequestParam(defaultValue = "0") Integer offset,
                                                             @RequestParam(defaultValue = "4") Integer limit,
                                                             @RequestParam(defaultValue = "-1") Integer status) {
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }

            Service foundService = this.serviceService.findServiceById(serviceId);
            if (ObjectUtils.isEmpty(foundService)) {
                return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
            }
            List<VariantService> foundVariantServices = new ArrayList<>();
            if (status == -1) {
                foundVariantServices = this.variantServiceService.findAllVariantServiceByServiceId(serviceId);
            } else if (status == 0) {
                foundVariantServices = this.variantServiceService.findAllVariantServiceByServiceIdAndDeleted(serviceId, false);
            } else {
                foundVariantServices = this.variantServiceService.findAllVariantServiceByServiceIdAndDeleted(serviceId, true);
            }

            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), foundVariantServices.size());
            List<VariantService> variantServices = foundVariantServices.subList(startIndex, endIndex);
            List<VariantServiceDTOResponse> responses = variantServices.stream()
                    .map(variantService -> new VariantServiceDTOResponse(variantService))
                    .collect(Collectors.toList());
            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> addVariantService(@RequestBody(required = true) Map<String, Object> newVariantService){
        try{
            if(ObjectUtils.isEmpty(newVariantService)
                    || ObjectUtils.isEmpty(newVariantService.get("name"))
                    || ObjectUtils.isEmpty(newVariantService.get("price"))
                    || ObjectUtils.isEmpty(newVariantService.get("description"))
                    || ObjectUtils.isEmpty(newVariantService.get("avatar"))
                    || ObjectUtils.isEmpty(newVariantService.get("quantity"))
                    || ObjectUtils.isEmpty(newVariantService.get("servicesId"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            int quantity = Integer.parseInt(newVariantService.get("quantity").toString());
            if (quantity < 0) {
                return super.error(ResponseCode.VALUE_LESS_THAN_ZERO.getCode(), ResponseCode.VALUE_LESS_THAN_ZERO.getMessage());
            }
            VariantService foundVariantService = this.variantServiceService.findByName(newVariantService.get("name").toString()).orElse(null);
            if(!ObjectUtils.isEmpty(foundVariantService)){
                return super.error(ResponseCode.DATA_ALREADY_EXISTS.getCode(),
                        ResponseCode.DATA_ALREADY_EXISTS.getMessage());
            }

            Long serviceId = Long.parseLong(newVariantService.get("servicesId").toString());
            Service foundService = this.serviceService.findServiceById(serviceId);
            if (ObjectUtils.isEmpty(foundService)) {
                return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
            }

            VariantService insertedVariantService = variantServiceService.addVariantService(newVariantService, foundService);
            return super.success(new VariantServiceDTOResponse(insertedVariantService));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> updateVariantService(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                           @RequestBody(required = false) Map<String, Object> newVariantService){
        try{
            if(ObjectUtils.isEmpty(newVariantService)
                    || ObjectUtils.isEmpty(newVariantService.get("name"))
                    || ObjectUtils.isEmpty(newVariantService.get("price"))
                    || ObjectUtils.isEmpty(newVariantService.get("description"))
                    || ObjectUtils.isEmpty(newVariantService.get("avatar"))
                    || ObjectUtils.isEmpty(newVariantService.get("quantity"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            int quantity = Integer.parseInt(newVariantService.get("quantity").toString());
            if (quantity < 0) {
                return super.error(ResponseCode.VALUE_LESS_THAN_ZERO.getCode(), ResponseCode.VALUE_LESS_THAN_ZERO.getMessage());
            }
            VariantService foundVariantService = this.variantServiceService.findVariantServiceById(id);
            if (ObjectUtils.isEmpty(foundVariantService)) {
                return super.error(ResponseCode.VARIANT_SERVICE_NOT_FOUND.getCode(), ResponseCode.VARIANT_SERVICE_NOT_FOUND.getMessage());
            }

            VariantService updatedVariantService = variantServiceService.updateVariantService(id, newVariantService);
            return super.success(new VariantServiceDTOResponse(updatedVariantService));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteVariantService(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            VariantService foundVariantService = this.variantServiceService.findVariantServiceById(id);
            if (ObjectUtils.isEmpty(foundVariantService)) {
                return super.error(ResponseCode.VARIANT_SERVICE_NOT_FOUND.getCode(), ResponseCode.VARIANT_SERVICE_NOT_FOUND.getMessage());
            }
            if (foundVariantService.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            VariantService deletedVariantService = variantServiceService.deleteVariantService(id);
            return super.success(new VariantServiceDTOResponse(deletedVariantService));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/active")
    public ResponseEntity<?> activeVariantService(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            VariantService foundVariantService = this.variantServiceService.findVariantServiceById(id);
            if (ObjectUtils.isEmpty(foundVariantService)) {
                return super.error(ResponseCode.VARIANT_SERVICE_NOT_FOUND.getCode(), ResponseCode.VARIANT_SERVICE_NOT_FOUND.getMessage());
            }
            if (foundVariantService.getDeleted().equals(false)) {
                return super.error(ResponseCode.ACTIVED.getCode(), ResponseCode.ACTIVED.getMessage());
            }
            VariantService activeVariantService = variantServiceService.activeVariantService(id);
            return super.success(new VariantServiceDTOResponse(activeVariantService));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
        @GetMapping("/search-variant-service-by-name-and-deleted")
    public ResponseEntity<?> searchVariantServiceByNameAndDeleted(@RequestParam String name,
                                                                  @RequestBody(required = false) Map<String, Object> newVariantService,
                                                                  @RequestParam(defaultValue = "0") Integer offset,
                                                                  @RequestParam(defaultValue = "4") Integer limit,
                                                                  @RequestParam(defaultValue = "-1") Integer status) {
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }
            List<VariantService> foundVariantServices;
            if (status == -1) {
                foundVariantServices = this.variantServiceService.searchByName(name);
            } else if (status == 0) {
                foundVariantServices = this.variantServiceService.searchByNameAndDeleted(name,false);
            } else {
                foundVariantServices = this.variantServiceService.searchByNameAndDeleted(name,true);
            }
            if (ObjectUtils.isEmpty(foundVariantServices)) {
                return super.error(ResponseCode.SERVICE_NOT_FOUND.getCode(), ResponseCode.SERVICE_NOT_FOUND.getMessage());
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), foundVariantServices.size());
            List<VariantService> variantServices = foundVariantServices.subList(startIndex, endIndex);
            List<VariantServiceDTOResponse> responses = variantServices.stream()
                    .map(variantService -> new VariantServiceDTOResponse(variantService))
                    .collect(Collectors.toList());
            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}
