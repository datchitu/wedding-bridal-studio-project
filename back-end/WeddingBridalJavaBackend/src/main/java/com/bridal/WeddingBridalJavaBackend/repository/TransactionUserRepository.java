package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.TransactionUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionUserRepository extends JpaRepository<TransactionUser, Long> {

    TransactionUser findByIdAndDeleted(Long id, boolean deleted);

    List<TransactionUser> findAllByUser_Id(Long userId);

    List<TransactionUser> findAllByUser_IdAndDeleted(Long userId, boolean deleted);

    List<TransactionUser> findAllByTransaction_Id(Long tranasctionId);

    List<TransactionUser> findAllByTransaction_IdAndDeleted(Long tranasctionId, boolean deleted);

    Optional<TransactionUser> findByTransaction_IdAndUser_Id(Long tranasctionId, Long userId);

    List<TransactionUser> findAllByDeleted(boolean deleted);

}
