package com.bridal.WeddingBridalJavaBackend.repository;

import com.bridal.WeddingBridalJavaBackend.model.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Optional<Voucher> findByCode(String code);
    Optional<Voucher> findByCodeAndDeleted(String code, boolean deleted);
    Optional<Voucher> findByName(String name);
    Optional<Voucher> findByNameAndDeleted(String name, boolean deleted);
    List<Voucher> findAllByDeleted(boolean deleted);
}
