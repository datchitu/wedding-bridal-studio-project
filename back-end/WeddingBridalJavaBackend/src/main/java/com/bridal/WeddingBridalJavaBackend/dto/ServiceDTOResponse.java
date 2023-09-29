package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ServiceDTOResponse {
    private Long id;
    private String name;
    private Boolean deleted;

    private List<Map<String, Object>> variantServices;

    public ServiceDTOResponse(Service service){
        this.id = service.getId();
        this.name = service.getName();
        this.deleted = service.getDeleted();
        this.variantServices = new ArrayList<>();
        if(!ObjectUtils.isEmpty(service.getVariantServices())){
            for(VariantService variantServices : service.getVariantServices()){
                this.variantServices.add(Map.of(
                        "variantServiceId", variantServices.getId(),
                        "variantServiceName", variantServices.getName()));
            }
        }
    }
}
