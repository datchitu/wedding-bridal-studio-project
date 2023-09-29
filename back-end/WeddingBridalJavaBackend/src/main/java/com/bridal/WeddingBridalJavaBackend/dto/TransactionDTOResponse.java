package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import com.bridal.WeddingBridalJavaBackend.model.Voucher;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class TransactionDTOResponse {
    private Long id;
    private Double totalPrice;
    private String note;
    private Boolean paymentType;
    private Boolean paymentStatus;
    private Boolean status;
    private Boolean deleted;
    private Timestamp createdAt;
    private Timestamp paidAt;

    private Long voucherId;
    private String voucherName;
    private Integer voucherDiscount;
    private Boolean voucherDeleted;
    private List<Map<String, Object>> transactionLineItems;

    public TransactionDTOResponse(Transaction transaction) {
        this.id = transaction.getId();
        this.totalPrice = transaction.getTotalPrice();
        this.note = transaction.getNote();
        this.paymentType = transaction.getPaymentType();
        this.paymentStatus = transaction.getPaymentStatus();
        this.status = transaction.getStatus();
        this.deleted = transaction.getDeleted();
        this.createdAt = transaction.getCreatedAt();
        this.paidAt = transaction.getPaidAt();

        if (!ObjectUtils.isEmpty(transaction.getVoucher())) {
            Voucher voucher = transaction.getVoucher();
            this.voucherId = voucher.getId();
            this.voucherName = voucher.getName();
            this.voucherDiscount = voucher.getDiscount();
            this.voucherDeleted = voucher.getDeleted();
        }

        this.transactionLineItems = new ArrayList<>();
        if(!ObjectUtils.isEmpty(transaction.getTransactionLineItems())) {
            for (TransactionLineItem transactionLineItem : transaction.getTransactionLineItems()) {
                this.transactionLineItems.add(Map.of(
                        "quantity",transactionLineItem.getQuantity(),
                        "totalPrice",transactionLineItem.getTotalPrice(),
                        "transactionLineItemName",transactionLineItem.getVariantService().getName(),
                        "deleted",transactionLineItem.getDeleted()
                ));
            }
        }
    }
}
