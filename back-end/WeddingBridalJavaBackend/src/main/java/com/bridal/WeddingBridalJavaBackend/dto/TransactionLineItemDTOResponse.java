package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

@Data
@AllArgsConstructor
public class TransactionLineItemDTOResponse {
    private Long id;
    private Integer quantity;
    private Double totalPrice;
    private Boolean deleted;

    private Long transactionId;
    private Long variantServiceId;
    private String variantServiceName;
    private String variantServiceAvatar;
    private Integer variantServiceQuantity;

    public TransactionLineItemDTOResponse(TransactionLineItem transactionLineItem) {
        this.id = transactionLineItem.getId();
        this.quantity = transactionLineItem.getQuantity();
        this.totalPrice = transactionLineItem.getTotalPrice();
        this.deleted = transactionLineItem.getDeleted();
        if(!ObjectUtils.isEmpty(transactionLineItem.getTransaction())) {
            Transaction transaction = transactionLineItem.getTransaction();
            this.transactionId = transaction.getId();
        }

        if(!ObjectUtils.isEmpty(transactionLineItem.getVariantService())) {
            VariantService variantService = transactionLineItem.getVariantService();
            this.variantServiceId = variantService.getId();
            this.variantServiceName = variantService.getName();
            this.variantServiceAvatar = variantService.getAvatar();
            this.variantServiceQuantity = variantService.getQuantity();
        }
    }
}
