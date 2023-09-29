package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.TransactionService;
import com.bridal.WeddingBridalJavaBackend.Service.UserService;
import com.bridal.WeddingBridalJavaBackend.Service.VariantServiceService;
import com.bridal.WeddingBridalJavaBackend.Service.VoucherService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.TransactionDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.*;
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
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
public class TransactionController extends BaseRestController{
    @Autowired
    private TransactionService transactionService;

    @Autowired
    private VariantServiceService variantServiceService;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private UserService userService;

    Date today = Date.from(new Date().toInstant());

    DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("")
    public ResponseEntity<?> getAllTransactionByDeleted(@RequestParam(defaultValue = "-1") Integer status,
                                                        @RequestParam(defaultValue = "0") Integer offset,
                                                        @RequestParam(defaultValue = "5") Integer limit) {
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
            List<Transaction> transactions;
            if (status == -1) {
                transactions = this.transactionService.getAllTransaction();
            } else if (status == 0) {
                transactions = this.transactionService.getAllTransactionByDeleted(false);
            } else {
                transactions = this.transactionService.getAllTransactionByDeleted(true);
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), transactions.size());
            transactions = transactions.subList(startIndex, endIndex);
            List<TransactionDTOResponse> responses = transactions.stream()
                    .map(transactionService -> new TransactionDTOResponse(transactionService))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-transaction-by-id-and-deleted")
    public ResponseEntity<?> getTransactionByIdAndDeleted(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                                         @RequestParam(defaultValue = "-1") Integer status) {
        // status = 0 => get not deleted
        // status = 1 => get deleted
        // status = -1 => get all
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        Transaction foundTransaction;
        if (status == -1) {
            foundTransaction = this.transactionService.findTransactionById(id);
        } else if (status == 0) {
            foundTransaction = this.transactionService.findTransactionByIdAndDeleted(id,false);
        } else {
            foundTransaction = this.transactionService.findTransactionByIdAndDeleted(id,true);
        }
        if (ObjectUtils.isEmpty(foundTransaction)) {
            return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
        }
        return super.success(new TransactionDTOResponse(foundTransaction));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/get-transaction-by-status-and-deleted")
    public ResponseEntity<?> getTransactionByStatusAndDeleted(@RequestParam(defaultValue = "-1") Integer status,
                                                          @RequestParam(defaultValue = "-1") Integer deleted,
                                                              @RequestParam(defaultValue = "0") Integer offset,
                                                              @RequestParam(defaultValue = "4") Integer limit) {
        try {
            // status = 0 => get not status
            // status = 1 => get status
            // deleted = 0 => get not deleted
            // deleted = 1 => get deleted
            // deleted = -1 => get all
            if(!Arrays.asList(0,1).contains(status) && !Arrays.asList(-1,0,1).contains(deleted)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }
            List<Transaction> transactions;
            if (deleted == -1) {
                if (status == 0) {
                    transactions = this.transactionService.getAllTransactionByStatus(false);
                } else {
                    transactions = this.transactionService.getAllTransactionByStatus(true);
                }
            } else if (deleted == 0) {
                if (status == 0) {
                    transactions = this.transactionService.getAllTransactionByStatusAndDeleted(false,false);
                } else {
                    transactions = this.transactionService.getAllTransactionByStatusAndDeleted(true,false);
                }
            } else {
                if (status == 0) {
                    transactions = this.transactionService.getAllTransactionByStatusAndDeleted(false,true);
                } else {
                    transactions = this.transactionService.getAllTransactionByStatusAndDeleted(true,true);
                }
            }
            if (ObjectUtils.isEmpty(transactions)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), transactions.size());
            transactions = transactions.subList(startIndex, endIndex);
            List<TransactionDTOResponse> responses = transactions.stream()
                    .map(transactionService -> new TransactionDTOResponse(transactionService))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/get-transaction-by-payment-status-and-deleted")
    public ResponseEntity<?> getTransactionByPaymentStatusAndDeleted(@RequestParam(defaultValue = "-1") Integer paymentStatus,
                                                              @RequestParam(defaultValue = "-1") Integer deleted,
                                                              @RequestParam(defaultValue = "0") Integer offset,
                                                              @RequestParam(defaultValue = "4") Integer limit) {
        try {
            // paymentStatus = 0 => get not payment
            // paymentStatus = 1 => get paid
            // deleted = 0 => get not deleted
            // deleted = 1 => get deleted
            // deleted = -1 => get all
            if(!Arrays.asList(0,1).contains(paymentStatus) && !Arrays.asList(-1,0,1).contains(deleted)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }
            List<Transaction> transactions;
            if (deleted == -1) {
                if (paymentStatus == 0) {
                    transactions = this.transactionService.getAllTransactionByPaymentStatus(false);
                } else {
                    transactions = this.transactionService.getAllTransactionByPaymentStatus(true);
                }
            } else if (deleted == 0) {
                if (paymentStatus == 0) {
                    transactions = this.transactionService.getAllTransactionByPaymentStatusAndDeleted(false,false);
                } else {
                    transactions = this.transactionService.getAllTransactionByPaymentStatusAndDeleted(true,false);
                }
            } else {
                if (paymentStatus == 0) {
                    transactions = this.transactionService.getAllTransactionByPaymentStatusAndDeleted(false,true);
                } else {
                    transactions = this.transactionService.getAllTransactionByPaymentStatusAndDeleted(true,true);
                }
            }
            if (ObjectUtils.isEmpty(transactions)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), transactions.size());
            transactions = transactions.subList(startIndex, endIndex);
            List<TransactionDTOResponse> responses = transactions.stream()
                    .map(transactionService -> new TransactionDTOResponse(transactionService))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/get-transaction-by-payment-type-and-deleted")
    public ResponseEntity<?> getTransactionByPaymentTypeAndDeleted(@RequestParam(defaultValue = "-1") Integer paymentType,
                                                                     @RequestParam(defaultValue = "-1") Integer deleted,
                                                                     @RequestParam(defaultValue = "0") Integer offset,
                                                                     @RequestParam(defaultValue = "4") Integer limit) {
        try {
            // paymentType = 0 => get offline payment
            // paymentType = 1 => get online payment
            // deleted = 0 => get not deleted
            // deleted = 1 => get deleted
            // deleted = -1 => get all
            if(!Arrays.asList(0,1).contains(paymentType) && !Arrays.asList(-1,0,1).contains(deleted)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            Pageable pageable = PageRequest.of(offset, limit);
            List<Sort.Order> orders = new ArrayList<>();
            if (!orders.isEmpty()) {
                pageable = PageRequest.of(offset, limit, Sort.by(orders));
            }
            List<Transaction> transactions;
            if (deleted == -1) {
                if (paymentType == 0) {
                    transactions = this.transactionService.getAllTransactionByPaymentType(false);
                } else {
                    transactions = this.transactionService.getAllTransactionByPaymentType(true);
                }
            } else if (deleted == 0) {
                if (paymentType == 0) {
                    transactions = this.transactionService.getAllTransactionByPaymentTypeAndDeleted(false,false);
                } else {
                    transactions = this.transactionService.getAllTransactionByPaymentTypeAndDeleted(true,false);
                }
            } else {
                if (paymentType == 0) {
                    transactions = this.transactionService.getAllTransactionByPaymentTypeAndDeleted(false,true);
                } else {
                    transactions = this.transactionService.getAllTransactionByPaymentTypeAndDeleted(true,true);
                }
            }
            if (ObjectUtils.isEmpty(transactions)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), transactions.size());
            transactions = transactions.subList(startIndex, endIndex);
            List<TransactionDTOResponse> responses = transactions.stream()
                    .map(transactionService -> new TransactionDTOResponse(transactionService))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

        @GetMapping("/get-transaction-by-false-status")
    public ResponseEntity<?> getTransactionByFalseStatus() {
        Transaction foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
        if (ObjectUtils.isEmpty(foundTransaction)) {
            return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
        }
        return super.success(new TransactionDTOResponse(foundTransaction));
    }

    @PostMapping("")
    public ResponseEntity<?> createEmpyTransaction(){
        try{
            Optional<Transaction> foundTransactionFalseStatus = this.transactionService.findTransactionByStatus(false);
            if(!ObjectUtils.isEmpty(foundTransactionFalseStatus)){
                return super.error(ResponseCode.DATA_ALREADY_EXISTS.getCode(),
                        ResponseCode.DATA_ALREADY_EXISTS.getMessage());
            }
            Transaction createTransaction = transactionService.createTransaction();
            return super.success(new TransactionDTOResponse(createTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PostMapping("/add-to-transaction")
    public ResponseEntity<?> addVariantServiceToTransaction(@RequestBody(required = true) Map<String, Object> newTransaction){
        try{
            if(ObjectUtils.isEmpty(newTransaction)
                    || ObjectUtils.isEmpty(newTransaction.get("variantServiceId"))
                    || ObjectUtils.isEmpty(newTransaction.get("quantity"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            int quantity = Integer.parseInt(newTransaction.get("quantity").toString());
            if (quantity < 0) {
                return super.error(ResponseCode.VALUE_LESS_THAN_ZERO.getCode(), ResponseCode.VALUE_LESS_THAN_ZERO.getMessage());
            }
            Long variantSerivceId = Long.parseLong(newTransaction.get("variantServiceId").toString());
            VariantService foundVariantService = this.variantServiceService.findVariantServiceById(variantSerivceId);
            if (ObjectUtils.isEmpty(foundVariantService)) {
                return super.error(ResponseCode.VARIANT_SERVICE_NOT_FOUND.getCode(), ResponseCode.VARIANT_SERVICE_NOT_FOUND.getMessage());
            }
            if (foundVariantService.getDeleted().equals(true)) {
                return super.error(ResponseCode.VARIANT_SERVICE_IS_DELETED.getCode(), ResponseCode.VARIANT_SERVICE_IS_DELETED.getMessage());
            }
            if (foundVariantService.getQuantity() < quantity) {
                return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
            }
            Transaction foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
            if (ObjectUtils.isEmpty(foundTransaction)) {
                createEmpyTransaction();
                foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
//                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            Transaction insertedToTransaction = transactionService.addVariantServiceToTransaction(foundVariantService, quantity);
            return super.success(new TransactionDTOResponse(insertedToTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/order")
    public ResponseEntity<?> orderTransaction(@RequestBody(required = false) Map<String, Object> newTransaction){
        try{
            if(ObjectUtils.isEmpty(newTransaction) || ObjectUtils.isEmpty(newTransaction.get("userId"))
                    || ObjectUtils.isEmpty(newTransaction.get("performDate"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            Transaction foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            List<TransactionLineItem> transactionLineItems = foundTransaction.getTransactionLineItems();
            VariantService foundVariantService;
            for (TransactionLineItem transactionLineItem : transactionLineItems) {
                foundVariantService = variantServiceService.findVariantServiceById(transactionLineItem.getVariantService().getId());
                if(transactionLineItem.getQuantity() > foundVariantService.getQuantity()) {
                    return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
                }
            }
            Long userId = Long.parseLong(newTransaction.get("userId").toString());
            User foundUser = this.userService.findUserById(userId);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            format.setLenient(false);
            Date performDateFormat = format.parse(newTransaction.get("performDate").toString());
            if (today.after(performDateFormat)) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            Transaction orderTransaction;
            if (ObjectUtils.isEmpty(newTransaction.get("voucherId"))) {
                orderTransaction = transactionService.orderTransactionNonVoucher(newTransaction, foundUser);
            } else {
                Long voucherId = Long.parseLong(newTransaction.get("voucherId").toString());
                Voucher foundVoucher = this.voucherService.findVoucherById(voucherId);
                if (ObjectUtils.isEmpty(foundVoucher)) {
                    return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
                }
                if (foundVoucher.getQuantity() < 0) {
                    return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
                }
                if (today.after(foundVoucher.getExpireDate())) {
                    return super.error(ResponseCode.EXPIRED_VOUCHER.getCode(), ResponseCode.EXPIRED_VOUCHER.getMessage());
                }
                orderTransaction = transactionService.orderTransaction(newTransaction, foundVoucher, foundUser);
            }
            return super.success(new TransactionDTOResponse(orderTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/payment")
    public ResponseEntity<?> paymentTransaction(@RequestBody(required = false) Map<String, Object> newTransaction){
        try{
            if(ObjectUtils.isEmpty(newTransaction) || ObjectUtils.isEmpty(newTransaction.get("userId"))
                    || ObjectUtils.isEmpty(newTransaction.get("performDate"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            Transaction foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            List<TransactionLineItem> transactionLineItems = foundTransaction.getTransactionLineItems();
            VariantService foundVariantService;
            for (TransactionLineItem transactionLineItem : transactionLineItems) {
                foundVariantService = variantServiceService.findVariantServiceById(transactionLineItem.getVariantService().getId());
                if(transactionLineItem.getQuantity() > foundVariantService.getQuantity()) {
                    return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
                }
            }
            Long userId = Long.parseLong(newTransaction.get("userId").toString());
            User foundUser = this.userService.findUserById(userId);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            format.setLenient(false);
            Date performDateFormat = format.parse(newTransaction.get("performDate").toString());
            if (today.after(performDateFormat)) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            Transaction paymentTransaction;
            if (ObjectUtils.isEmpty(newTransaction.get("voucherId"))) {
                paymentTransaction = transactionService.paymentTransactionNonVoucher(newTransaction, foundUser);
            } else {
                Long voucherId = Long.parseLong(newTransaction.get("voucherId").toString());
                Voucher foundVoucher = this.voucherService.findVoucherById(voucherId);
                if (ObjectUtils.isEmpty(foundVoucher)) {
                    return super.error(ResponseCode.VOUCHER_NOT_FOUND.getCode(), ResponseCode.VOUCHER_NOT_FOUND.getMessage());
                }
                if (foundVoucher.getQuantity() < 0) {
                    return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
                }
                if (today.after(foundVoucher.getExpireDate())) {
                    return super.error(ResponseCode.EXPIRED_VOUCHER.getCode(), ResponseCode.EXPIRED_VOUCHER.getMessage());
                }
                paymentTransaction = transactionService.paymentTransaction(newTransaction, foundVoucher, foundUser);
            }
            return super.success(new TransactionDTOResponse(paymentTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTransaction(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                               @RequestParam(name = "note", defaultValue = "") String note){
        try{
            if(ObjectUtils.isEmpty(id)){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            Transaction foundTransaction = this.transactionService.findTransactionById(id);
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            if (foundTransaction.getPaymentStatus().equals(true)) {
                return super.error(ResponseCode.PAID.getCode(), ResponseCode.PAID.getMessage());
            }
            Transaction updateTransaction = transactionService.updateTransaction(id, note);
            return super.success(new TransactionDTOResponse(updateTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTransaction(@RequestParam(name = "id", required = false, defaultValue = "1") Long id){
        try{
            Transaction foundTransaction = this.transactionService.findTransactionById(id);
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            if (foundTransaction.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            if (foundTransaction.getPaymentStatus().equals(true)) {
                return super.error(ResponseCode.PAID.getCode(), ResponseCode.PAID.getMessage());
            }
            Transaction deleteTransaction = transactionService.deleteTransaction(id);
            return super.success(new TransactionDTOResponse(deleteTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/active")
    public ResponseEntity<?> activeTransaction(@RequestParam(name = "id", required = false, defaultValue = "1") Long id){
        try{
            Transaction foundTransaction = this.transactionService.findTransactionById(id);
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            if (foundTransaction.getDeleted().equals(false)) {
                return super.error(ResponseCode.ACTIVED.getCode(), ResponseCode.ACTIVED.getMessage());
            }
            Transaction activeTransaction = transactionService.activeTransaction(id);
            return super.success(new TransactionDTOResponse(activeTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/set-total-price-empty-transaction")
    public ResponseEntity<?> setTotalPriceEmptyTransaction() {
        try{
            Transaction foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            foundTransaction = transactionService.setTotalPriceEmptyTransaction(foundTransaction.getId());
            return super.success(new TransactionDTOResponse(foundTransaction));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

}
