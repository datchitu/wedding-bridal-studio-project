package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionUser;
import com.bridal.WeddingBridalJavaBackend.model.User;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface TransactionUserService {
    TransactionUser findTransactionUserById(Long id);

    TransactionUser findTransactionUserByIdAndDeleted(Long id, Boolean deleted);

    List<TransactionUser> findAllTransactionUserByUserId(Long userId);

    List<TransactionUser> findAllTransactionUserByUserIdAndDeleted(Long userId, Boolean deleted);

    List<TransactionUser> findAllTransactionUserByTransactionId(Long transactionId);

    List<TransactionUser> findAllTransactionUserByTransactionIdAndDeleted(Long transactionId, Boolean deleted);

    List<TransactionUser> getAllTransactionUser();

    List<TransactionUser> getAllTransactionUserByDeleted(Boolean deleted);

    TransactionUser getTransactionUserByTransactionIdAndUserId(Long transactionId, Long userId);

    TransactionUser addTransactionUser(Map<String, Object> newTransactionUser, User user , Transaction transaction) throws ParseException;

    List<TransactionUser> createListTransactionUser(Transaction transaction, User user, String performDate) throws ParseException;

    TransactionUser updateTransactionUser(Long id, Map<String, Object> newTransactionUser, User user) throws ParseException;

    TransactionUser updatePerformDate(Long id, Date performDatetime) throws ParseException;

    TransactionUser completeTransactionUser(Long id);

    TransactionUser deleteTransactionUser(Long id);

    TransactionUser activeTransactionUser(Long id);
}
