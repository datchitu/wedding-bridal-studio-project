package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

@Data
@AllArgsConstructor
public class VariantServiceDTOResponse {
    private Long id;
    private String name;
    private double price;
    private String description;
    private String avatar;
    private Integer quantity;
    private Boolean deleted;

    private Long serviceId;
    private String serviceName;

    public VariantServiceDTOResponse(VariantService variantService){
        this.id = variantService.getId();
        this.name = variantService.getName();
        this.price = variantService.getPrice();
        this.description = variantService.getDescription();
        this.avatar = variantService.getAvatar();
        this.quantity = variantService.getQuantity();
        this.deleted = variantService.getDeleted();
        if(!ObjectUtils.isEmpty(variantService.getService())){
            Service service = variantService.getService();
            this.serviceId = service.getId();
            this.serviceName = service.getName();
        }
    }
}
