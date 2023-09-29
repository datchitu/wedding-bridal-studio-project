package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.TransactionService;
import com.bridal.WeddingBridalJavaBackend.Service.TransactionUserService;
import com.bridal.WeddingBridalJavaBackend.Service.UserService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.CategoryDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.TransactionUserDTOResponse;
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
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transaction-users")
public class TransactionUserController extends BaseRestController{
    @Autowired
    TransactionUserService transactionUserService;

    @Autowired
    UserService userService;

    @Autowired
    TransactionService transactionService;

    Date today = Date.from(new Date().toInstant());

    DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("")
    public ResponseEntity<?> getAllTransactionUserAndDeleted(@RequestParam(defaultValue = "-1") Integer status,
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
            List<TransactionUser> transactionUsers;
            if (status == -1) {
                transactionUsers = this.transactionUserService.getAllTransactionUser();
            } else if (status == 0) {
                transactionUsers = this.transactionUserService.getAllTransactionUserByDeleted(false);
            } else {
                transactionUsers = this.transactionUserService.getAllTransactionUserByDeleted(true);
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), transactionUsers.size());
            transactionUsers = transactionUsers.subList(startIndex, endIndex);
            List<TransactionUserDTOResponse> responses = transactionUsers.stream()
                    .map(transactionUser -> new TransactionUserDTOResponse(transactionUser))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-transaction-user-by-id-and-deleted")
    public ResponseEntity<?> getTransactionUserByIdAndDeleted(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                                              @RequestParam(defaultValue = "-1") Integer status) {
        // status = 0 => get not deleted
        // status = 1 => get deleted
        // status = -1 => get all
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        TransactionUser foundTransactionUser;
        if (status == -1) {
            foundTransactionUser = this.transactionUserService.findTransactionUserById(id);
        } else if (status == 0) {
            foundTransactionUser = this.transactionUserService.findTransactionUserByIdAndDeleted(id,false);
        } else {
            foundTransactionUser = this.transactionUserService.findTransactionUserByIdAndDeleted(id,true);
        }
        if (ObjectUtils.isEmpty(foundTransactionUser)) {
            return super.error(ResponseCode.TRANSACTION_USER_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_USER_NOT_FOUND.getMessage());
        }
        return super.success(new TransactionUserDTOResponse(foundTransactionUser));
    }

    @GetMapping("/get-all-transaction-user-by-user-id-and-deleted")
    public ResponseEntity<?> getAllTransactionUserByServiceIdAndDeleted(@RequestParam(name = "userId") Long userId,
                                                                       @RequestParam(defaultValue = "0") Integer offset,
                                                                       @RequestParam(defaultValue = "4") Integer limit,
                                                                       @RequestParam(defaultValue = "-1") Integer status) {
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

            User foundUser = this.userService.findUserById(userId);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            List<TransactionUser> foundTransactionUsers = new ArrayList<>();
            if (status == -1) {
                foundTransactionUsers = this.transactionUserService.findAllTransactionUserByUserId(userId);
            } else if (status == 0) {
                foundTransactionUsers = this.transactionUserService.findAllTransactionUserByUserIdAndDeleted(userId, false);
            } else {
                foundTransactionUsers = this.transactionUserService.findAllTransactionUserByUserIdAndDeleted(userId, true);
            }

            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), foundTransactionUsers.size());
            List<TransactionUser> transactionUsers = foundTransactionUsers.subList(startIndex, endIndex);
            List<TransactionUserDTOResponse> responses = transactionUsers.stream()
                    .map(transactionUser -> new TransactionUserDTOResponse(transactionUser))
                    .collect(Collectors.toList());
            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-all-transaction-user-by-transaction-id-and-deleted")
    public ResponseEntity<?> getAllTransactionUserByTransactionIdAndDeleted(@RequestParam(name = "transactionId", defaultValue = "1") Long transactionId,
                                                                       @RequestParam(defaultValue = "0") Integer offset,
                                                                       @RequestParam(defaultValue = "10") Integer limit,
                                                                       @RequestParam(defaultValue = "-1") Integer status) {
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

            Transaction foundTransaction = this.transactionService.findTransactionById(transactionId);
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            List<TransactionUser> foundTransactionUsers;
            if (status == -1) {
                foundTransactionUsers = this.transactionUserService.findAllTransactionUserByTransactionId(transactionId);
            } else if (status == 0) {
                foundTransactionUsers = this.transactionUserService.findAllTransactionUserByTransactionIdAndDeleted(transactionId, false);
            } else {
                foundTransactionUsers = this.transactionUserService.findAllTransactionUserByTransactionIdAndDeleted(transactionId, true);
            }

            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), foundTransactionUsers.size());
            List<TransactionUser> transactionUsers = foundTransactionUsers.subList(startIndex, endIndex);
            List<TransactionUserDTOResponse> responses = transactionUsers.stream()
                    .map(transactionUser -> new TransactionUserDTOResponse(transactionUser))
                    .collect(Collectors.toList());
            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-transaction-user-by-transaction-id-and-user-id")
    public ResponseEntity<?> getTransactionUserByTransactionIdAndUserId(@RequestParam(name = "transactionId", defaultValue = "1") Long transactionId,
                                                                        @RequestParam(name = "userId", defaultValue = "1") Long userId) {
        try {
            Transaction foundTransaction = this.transactionService.findTransactionById(transactionId);
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            User foundUser = this.userService.findUserById(userId);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            TransactionUser foundTransactionUser = transactionUserService.getTransactionUserByTransactionIdAndUserId(transactionId, userId);
            return super.success(new TransactionUserDTOResponse(foundTransactionUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

//    @PreAuthorize("hasAnyRole('ADMIN','USER','STAFF')")
    @PostMapping("")
    public ResponseEntity<?> addTransactionUser(@RequestBody(required = true) Map<String, Object> newTransactionUser){
        try{
            if(ObjectUtils.isEmpty(newTransactionUser)
                    || ObjectUtils.isEmpty(newTransactionUser.get("performDatetime"))
                    || ObjectUtils.isEmpty(newTransactionUser.get("userId"))
                    || ObjectUtils.isEmpty(newTransactionUser.get("transactionId"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            if (today.after(format.parse(newTransactionUser.get("performDatetime").toString()))) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            Long userId = Long.parseLong(newTransactionUser.get("userId").toString());
            User foundUser = this.userService.findUserById(userId);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            Long transactionId = Long.parseLong(newTransactionUser.get("transactionId").toString());
            Transaction foundTransaction = this.transactionService.findTransactionById(transactionId);
            if (ObjectUtils.isEmpty(foundTransaction)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            TransactionUser insertedTransactionUser = transactionUserService.addTransactionUser(newTransactionUser, foundUser, foundTransaction);
            return super.success(new TransactionUserDTOResponse(insertedTransactionUser));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> updateTransactionUser(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                                  @RequestBody(required = false) Map<String, Object> newTransactionUser){
        try{
            if(ObjectUtils.isEmpty(newTransactionUser)
                    || ObjectUtils.isEmpty(newTransactionUser.get("performDatetime"))
                    || ObjectUtils.isEmpty(newTransactionUser.get("userId"))){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            format.setLenient(false);
            Date performDateFormat = format.parse(newTransactionUser.get("performDatetime").toString());
            if (today.after(performDateFormat)) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            TransactionUser foundTransactionUser = this.transactionUserService.findTransactionUserById(id);
            if (ObjectUtils.isEmpty(foundTransactionUser)) {
                return super.error(ResponseCode.TRANSACTION_USER_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_USER_NOT_FOUND.getMessage());
            }
            Long userId = Long.parseLong(newTransactionUser.get("userId").toString());
            User foundUser = this.userService.findUserById(userId);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            TransactionUser updatedTransactionUser = transactionUserService.updateTransactionUser(id, newTransactionUser, foundUser);
            return super.success(new TransactionUserDTOResponse(updatedTransactionUser));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/update-perform-date")
    public ResponseEntity<?> updatePerformDate(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                               @RequestParam(name = "performDatetime") String performDatetime){
        try{
            if(ObjectUtils.isEmpty(performDatetime)
                    || ObjectUtils.isEmpty(id)){
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            TransactionUser foundTransactionUser = this.transactionUserService.findTransactionUserById(id);
            if (ObjectUtils.isEmpty(foundTransactionUser)) {
                return super.error(ResponseCode.TRANSACTION_USER_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_USER_NOT_FOUND.getMessage());
            }
            format.setLenient(false);
            Date performDateFormat = format.parse(performDatetime);
            if (today.after(performDateFormat)) {
                return super.error(ResponseCode.BEFORE_TODAY.getCode(), ResponseCode.BEFORE_TODAY.getMessage());
            }
            TransactionUser updatedPerformDate = transactionUserService.updatePerformDate(id, performDateFormat);
            return super.success(new TransactionUserDTOResponse(updatedPerformDate));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'PHOTOGRAPHER')")
    @DeleteMapping("/complete")
    public ResponseEntity<?> completeTransactionUser(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            TransactionUser foundTransactionUser = this.transactionUserService.findTransactionUserById(id);
            if (ObjectUtils.isEmpty(foundTransactionUser)) {
                return super.error(ResponseCode.TRANSACTION_USER_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_USER_NOT_FOUND.getMessage());
            }
            if (foundTransactionUser.getStatus().equals(true)) {
                return super.error(ResponseCode.COMPLETE.getCode(), ResponseCode.COMPLETE.getMessage());
            }
            TransactionUser completeTransactionUser = transactionUserService.completeTransactionUser(id);
            return super.success(new TransactionUserDTOResponse(completeTransactionUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTransactionUser(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            TransactionUser foundTransactionUser = this.transactionUserService.findTransactionUserById(id);
            if (ObjectUtils.isEmpty(foundTransactionUser)) {
                return super.error(ResponseCode.TRANSACTION_USER_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_USER_NOT_FOUND.getMessage());
            }
            if (foundTransactionUser.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            TransactionUser deletedTransactionUser = transactionUserService.deleteTransactionUser(id);
            return super.success(new TransactionUserDTOResponse(deletedTransactionUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/active")
    public ResponseEntity<?> activeTransactionUser(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            TransactionUser foundTransactionUser = this.transactionUserService.findTransactionUserById(id);
            if (ObjectUtils.isEmpty(foundTransactionUser)) {
                return super.error(ResponseCode.TRANSACTION_USER_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_USER_NOT_FOUND.getMessage());
            }
            if (foundTransactionUser.getDeleted().equals(false)) {
                return super.error(ResponseCode.ACTIVED.getCode(), ResponseCode.ACTIVED.getMessage());
            }
            TransactionUser activeTransactionUser = transactionUserService.activeTransactionUser(id);
            return super.success(new TransactionUserDTOResponse(activeTransactionUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}
