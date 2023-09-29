package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.VoucherService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.CategoryDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.VariantServiceDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.VoucherDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import com.bridal.WeddingBridalJavaBackend.model.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.text.Normalizer;
import java.text.Normalizer.Form;

@RestController
@RequestMapping("/vouchers")
public class VoucherController extends BaseRestController{
    @Autowired
    VoucherService voucherService;

    Date today = Date.from(new Date().toInstant());

    DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @GetMapping("")
    public ResponseEntity<?> getAllVoucher(@RequestParam(defaultValue = "-1") Integer status,
                                                  @RequestParam(defaultValue = "0") Integer offset,
                                                  @RequestParam(defaultValue = "10") Integer limit){
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }
            List<Voucher> vouchers;
            if (status == -1) {
                vouchers = this.voucherService.getAllVoucher();
            } else if (status == 0) {
                vouchers = this.voucherService.getAllVoucherByDeleted(false);
            } else {
                vouchers = this.voucherService.getAllVoucherByDeleted(true);
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), vouchers.size());
            vouchers = vouchers.subList(startIndex, endIndex);
            List<VoucherDTOResponse> responses = vouchers.stream()
                    .map(voucher -> new VoucherDTOResponse(voucher))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-voucher-by-id")
    public ResponseEntity<?> getVoucherById(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        Voucher foundVoucher = this.voucherService.findVoucherById(id);
        if (ObjectUtils.isEmpty(foundVoucher)) {
            return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
        }
        return super.success(new VoucherDTOResponse(foundVoucher));
    }

    @GetMapping("/get-voucher-by-name")
    public ResponseEntity<?> getVoucherByNameAndDeleted(@RequestParam(name = "name", required = false) String name,
                                                        @RequestParam(defaultValue = "-1") Integer status) {
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        Voucher foundVoucher;
        if (status == -1) {
            foundVoucher = this.voucherService.findByName(name).orElse(null);
        } else if (status == 0) {
            foundVoucher = this.voucherService.findByNameAndDeleted(name,false).orElse(null);
        } else {
            foundVoucher = this.voucherService.findByNameAndDeleted(name,true).orElse(null);
        }
        if (ObjectUtils.isEmpty(foundVoucher)) {
            return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
        }

        return super.success(new VoucherDTOResponse(foundVoucher));
    }

    @GetMapping("/get-voucher-by-code")
    public ResponseEntity<?> getVoucherByCodeAndDeleted(@RequestParam(name = "code", required = false) String code,
                                                        @RequestParam(defaultValue = "-1") Integer status) {
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        Voucher foundVoucher;
        if (status == -1) {
            foundVoucher = this.voucherService.findByCode(code).orElse(null);
        } else if (status == 0) {
            foundVoucher = this.voucherService.findByCodeAndDeleted(code,false).orElse(null);
        } else {
            foundVoucher = this.voucherService.findByCodeAndDeleted(code,true).orElse(null);
        }
        if (ObjectUtils.isEmpty(foundVoucher)) {
            return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
        }

        return super.success(new VoucherDTOResponse(foundVoucher));
    }

    @GetMapping("/check-voucher-by-code")
    public ResponseEntity<?> checkVoucherByCodeAndDeleted(@RequestParam(name = "code", required = false) String code,
                                                        @RequestParam(defaultValue = "-1") Integer status) {
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        Voucher foundVoucher;
        if (status == -1) {
            foundVoucher = this.voucherService.findByCode(code).orElse(null);
        } else if (status == 0) {
            foundVoucher = this.voucherService.findByCodeAndDeleted(code,false).orElse(null);
        } else {
            foundVoucher = this.voucherService.findByCodeAndDeleted(code,true).orElse(null);
        }
        if (ObjectUtils.isEmpty(foundVoucher)) {
            return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
        }
        if (foundVoucher.getQuantity() < 1) {
            return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
        }
        if (today.after(foundVoucher.getExpireDate())) {
            return super.error(ResponseCode.EXPIRED_VOUCHER.getCode(), ResponseCode.EXPIRED_VOUCHER.getMessage());
        }
        return super.success(new VoucherDTOResponse(foundVoucher));
    }



    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> addVoucher(@RequestBody(required = true) Map<String, Object> newVoucher) {
        try {
            if (ObjectUtils.isEmpty(newVoucher)
                    || ObjectUtils.isEmpty(newVoucher.get("name"))
                    || ObjectUtils.isEmpty(newVoucher.get("code"))
                    || ObjectUtils.isEmpty(newVoucher.get("discount"))
                    || ObjectUtils.isEmpty(newVoucher.get("quantity"))
                    || ObjectUtils.isEmpty(newVoucher.get("expireDate"))) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            format.setLenient(false);
            Date expireDateFormat = format.parse(newVoucher.get("expireDate").toString());
            if (today.after(expireDateFormat)) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            Voucher foundVoucher = this.voucherService.findByCode(newVoucher.get("code").toString()).orElse(null);
            if (!ObjectUtils.isEmpty(foundVoucher)) {
                return super.error(ResponseCode.DATA_ALREADY_EXISTS.getCode(),
                        ResponseCode.DATA_ALREADY_EXISTS.getMessage());
            }
            Voucher insertedVoucher= voucherService.addVoucher(newVoucher);
            return super.success(new VoucherDTOResponse(insertedVoucher));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> updateVoucher(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                            @RequestBody(required = false) Map<String, Object> newVoucher) {
        try {
            if (ObjectUtils.isEmpty(newVoucher)
                    || ObjectUtils.isEmpty(newVoucher.get("name"))
                    || ObjectUtils.isEmpty(newVoucher.get("code"))
                    || ObjectUtils.isEmpty(newVoucher.get("discount"))
                    || ObjectUtils.isEmpty(newVoucher.get("quantity"))
                    || ObjectUtils.isEmpty(newVoucher.get("expireDate"))) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            format.setLenient(false);
            Date expireDateFormat = format.parse(newVoucher.get("expireDate").toString());
            if (today.after(expireDateFormat)) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            Voucher foundVoucher = this.voucherService.findVoucherById(id);
            if (ObjectUtils.isEmpty(foundVoucher)) {
                return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
            }
            Voucher updatedVoucher = voucherService.updateVoucher(id, newVoucher);
            return super.success(new VoucherDTOResponse(updatedVoucher));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteVoucher(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            Voucher foundVoucher = this.voucherService.findVoucherById(id);
            if (ObjectUtils.isEmpty(foundVoucher)) {
                return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
            }
            if (foundVoucher.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            Voucher deletedVoucher = voucherService.deleteVoucher(id);
            return super.success(new VoucherDTOResponse(deletedVoucher));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/active")
    public ResponseEntity<?> activeCategory(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            Voucher foundVoucher = this.voucherService.findVoucherById(id);
            if (ObjectUtils.isEmpty(foundVoucher)) {
                return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
            }
            if (foundVoucher.getDeleted().equals(false)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            Voucher activeVoucher = voucherService.activeVoucher(id);
            return super.success(new VoucherDTOResponse(activeVoucher));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}
