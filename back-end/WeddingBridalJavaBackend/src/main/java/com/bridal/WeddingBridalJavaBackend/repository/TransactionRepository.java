package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByStatus(boolean status);
    List<Transaction> findAllByStatusAndDeleted(boolean status, boolean deleted);
    List<Transaction> findAllByPaymentStatus(boolean paymentStatus);
    List<Transaction> findAllByPaymentStatusAndDeleted(boolean paymentStatus,boolean deleted);
    List<Transaction> findAllByPaymentType(boolean paymentType);
    List<Transaction> findAllByPaymentTypeAndDeleted(boolean paymentType,boolean deleted);

    List<Transaction> findAllByDeleted(boolean deleted);
    Transaction findByIdAndDeleted(Long id,boolean deleted);
    Optional<Transaction> findByStatus(boolean status);
}
