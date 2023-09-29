package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;

import java.util.List;
import java.util.Map;

public interface TransactionLineItemService {

//
//    List<TransactionLineItem> findAllTransactionLineItemByTransactionId(Long transactionId);

    List<TransactionLineItem> getAllTransactionLineItem();

    List<TransactionLineItem> getAllTransactionLineItemByDeleted(Boolean deleted);

    TransactionLineItem findTransactionLineItemById(Long id);

    public List<TransactionLineItem> findByTransactionId(Long transactionId);

    List<TransactionLineItem> findByTransactionIdAndDeleted(Long transactionId, Boolean deleted);

    TransactionLineItem findTransactionLineItem(List<TransactionLineItem> transactionItems,
                                                Long variantServiceId);

    TransactionLineItem updateTransactionLineItem(Long id, int quantity);

    TransactionLineItem deleteTransactionLineItem(Long id);

    TransactionLineItem activeTransactionLineItem(Long id);

    double totalPrice(List<TransactionLineItem> transactionLineItems);

//    TransactionLineItem addTransactionLineItem(Map<String, Object> newTransactionLineItem, Transaction transaction);
//
//    TransactionLineItem updateTransactionLineItem(Long id, Map<String, Object> newTransactionLineItem);
//
//    TransactionLineItem deleteTransactionLineItem(Long id);
}