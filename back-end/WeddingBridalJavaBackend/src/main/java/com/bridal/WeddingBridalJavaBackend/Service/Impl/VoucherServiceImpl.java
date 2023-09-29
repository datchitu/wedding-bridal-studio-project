package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.VoucherService;
import com.bridal.WeddingBridalJavaBackend.model.Voucher;
import com.bridal.WeddingBridalJavaBackend.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {

    Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());

    DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private VoucherRepository voucherRepository;
    @Override
    public Voucher findVoucherById(Long id) {
        return this.voucherRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<Voucher> findByName(String name) {return this.voucherRepository.findByName(name); }

    @Override
    public Optional<Voucher> findByNameAndDeleted(String name, Boolean deleted) {return this.voucherRepository.findByNameAndDeleted(name, deleted); }

    @Override
    public Optional<Voucher> findByCode(String code) {
        return this.voucherRepository.findByCode(code);
    }

    @Override
    public Optional<Voucher> findByCodeAndDeleted(String code, Boolean deleted) {
        return this.voucherRepository.findByCodeAndDeleted(code, deleted);
    }

    @Override
    public List<Voucher> getAllVoucher() {
        return this.voucherRepository.findAll();
    }

    @Override
    public List<Voucher> getAllVoucherByDeleted(Boolean deleted) {
        return this.voucherRepository.findAllByDeleted(deleted);
    }

    @Override
    public Voucher addVoucher(Map<String, Object> newVoucher) throws ParseException{
        Voucher voucher = new Voucher();
        voucher.setName(newVoucher.get("name").toString());
        voucher.setCode(newVoucher.get("code").toString());
        voucher.setDiscount(Integer.parseInt(newVoucher.get("discount").toString()));
        voucher.setQuantity(Integer.parseInt(newVoucher.get("quantity").toString()));
        voucher.setExpireDate(format.parse(newVoucher.get("expireDate").toString()));
        voucher.setDeleted(false);
        return this.voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(Long id, Map<String, Object> newVoucher) throws ParseException{
        Voucher voucher = this.findVoucherById(id);
        voucher.setName(newVoucher.get("name").toString());
        voucher.setCode(newVoucher.get("code").toString());
        voucher.setDiscount(Integer.parseInt(newVoucher.get("discount").toString()));
        voucher.setQuantity(Integer.parseInt(newVoucher.get("quantity").toString()));
        voucher.setExpireDate(format.parse(newVoucher.get("expireDate").toString()));
        voucher.setUpdatedAt(ts);
        return this.voucherRepository.save(voucher);
    }

    @Override
    public Voucher deleteVoucher(Long id) {
        Voucher voucher = this.findVoucherById(id);
        voucher.setDeleted(true);
        voucher.setUpdatedAt(ts);
        return this.voucherRepository.save(voucher);
    }

    @Override
    public Voucher activeVoucher(Long id) {
        Voucher voucher = this.findVoucherById(id);
        voucher.setDeleted(false);
        voucher.setUpdatedAt(ts);
        return this.voucherRepository.save(voucher);
    }

}
