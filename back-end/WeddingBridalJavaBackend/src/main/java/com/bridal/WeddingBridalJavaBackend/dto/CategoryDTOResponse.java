package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class CategoryDTOResponse {
    private Long id;
    private String name;
    private Boolean deleted;

    private List<Map<String, Object>> services;

    public CategoryDTOResponse(Category category){
        this.id = category.getId();
        this.name = category.getName();
        this.deleted = category.getDeleted();

        this.services = new ArrayList<>();
        if(!ObjectUtils.isEmpty(category.getServices())){
            for(Service service : category.getServices()){
                this.services.add(Map.of("serviceId", service.getId(),
                        "serviceName", service.getName(), "serviceDeleted", service.getDeleted()));
            }
        }
    }
}
