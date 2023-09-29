package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.Voucher;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface VoucherService {
    Voucher findVoucherById(Long id);

    Optional<Voucher> findByName(String name);

    Optional<Voucher> findByNameAndDeleted(String name, Boolean deleted);

    Optional<Voucher> findByCode(String code);

    Optional<Voucher> findByCodeAndDeleted(String code, Boolean deleted);

    List<Voucher> getAllVoucher();

    List<Voucher> getAllVoucherByDeleted(Boolean deleted);

    Voucher addVoucher(Map<String, Object> newVoucher) throws ParseException;

    Voucher updateVoucher(Long id, Map<String, Object> newVoucher) throws ParseException;

    Voucher deleteVoucher(Long id);

    Voucher activeVoucher(Long id);

}
