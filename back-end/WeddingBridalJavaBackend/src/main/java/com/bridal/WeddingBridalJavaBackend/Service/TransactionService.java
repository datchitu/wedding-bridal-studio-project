package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface TransactionService {

    Transaction findTransactionById(Long id);

    Transaction findTransactionByIdAndDeleted(Long id, Boolean deleted);

    List<Transaction> getAllTransaction();

    List<Transaction> getAllTransactionByDeleted(Boolean deleted);

    List<Transaction> getAllTransactionByStatus(Boolean status);

    List<Transaction> getAllTransactionByStatusAndDeleted(Boolean status, Boolean deleted);

    List<Transaction> getAllTransactionByPaymentStatus(Boolean paymentStatus);

    List<Transaction> getAllTransactionByPaymentStatusAndDeleted(Boolean paymentStatus, Boolean deleted);

    List<Transaction> getAllTransactionByPaymentType(Boolean paymentType);

    List<Transaction> getAllTransactionByPaymentTypeAndDeleted(Boolean paymentType, Boolean deleted);

    public Optional<Transaction> findTransactionByStatus(Boolean status);


    Transaction createTransaction();

    Transaction findTransactionByFalseStatusFirst();

    Transaction addVariantServiceToTransaction(VariantService variantService, int quantity);

    Transaction orderTransaction(Map<String, Object> newTransaction, Voucher voucher, User user) throws ParseException;

    Transaction orderTransactionNonVoucher(Map<String, Object> newTransaction, User user) throws ParseException;

    Transaction paymentTransaction(Map<String, Object> newTransaction, Voucher voucher, User user) throws ParseException;

    Transaction paymentTransactionNonVoucher(Map<String, Object> newTransaction, User user) throws ParseException;

    Transaction updateTransaction(Long id, String note) throws ParseException;

    Transaction deleteTransaction(Long id);

    Transaction activeTransaction(Long id);

    Transaction setTotalPriceEmptyTransaction(Long id);
}
