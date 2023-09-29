package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionLineItemRepository extends JpaRepository<TransactionLineItem, Long> {
    List<TransactionLineItem> findAllByDeleted(boolean deleted);

    List<TransactionLineItem> findAllByTransaction_Id(Long transactionId);

    List<TransactionLineItem> findAllByTransaction_IdAndDeleted(Long transactionId, boolean deleted);

}
