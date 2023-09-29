package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.Voucher;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class VoucherDTOResponse {
    private Long id;
    private String name;
    private String code;
    private Integer discount;
    private Integer quantity;
    private Date expireDate;
    private Boolean deleted;

//    private List<Map<String, Object>> transactions;

    public VoucherDTOResponse(Voucher voucher) {
        this.id = voucher.getId();
        this.name = voucher.getName();
        this.code = voucher.getCode();
        this.discount = voucher.getDiscount();
        this.quantity = voucher.getQuantity();
        this.expireDate = voucher.getExpireDate();
        this.deleted = voucher.getDeleted();
//        if (!ObjectUtils.isEmpty(voucher.getTransactions())) {
//            for (Transaction transaction : voucher.getTransactions()) {
//                this.transactions.add(Map.of("transactionId", transaction.getId(), "transactionDeleted", transaction.getDeleted()));
//            }
//        }
    }
}
