package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionUser;
import com.bridal.WeddingBridalJavaBackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionUserDTOResponse {
    private Long id;
    private Date performDatetime;
    private Timestamp createdAt;
    private Boolean status;
    private Boolean deleted;
    private Long userId;
    private Long transactionId;
    public TransactionUserDTOResponse(TransactionUser transactionUser) {
        this.id = transactionUser.getId();
        this.performDatetime = transactionUser.getPerformDatetime();
        this.status = transactionUser.getStatus();
        this.deleted = transactionUser.getDeleted();
        this.createdAt = transactionUser.getCreatedAt();

        if (!ObjectUtils.isEmpty(transactionUser.getUser())) {
            User user = transactionUser.getUser();
            this.userId = user.getId();
        }

        if (!ObjectUtils.isEmpty(transactionUser.getTransaction())) {
            Transaction transaction = transactionUser.getTransaction();
            this.transactionId = transaction.getId();
        }
    }
}
