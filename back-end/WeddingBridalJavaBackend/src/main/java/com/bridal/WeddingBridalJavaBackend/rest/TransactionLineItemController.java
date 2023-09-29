package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.TransactionLineItemService;
import com.bridal.WeddingBridalJavaBackend.Service.TransactionService;
import com.bridal.WeddingBridalJavaBackend.Service.VariantServiceService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.TransactionLineItemDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.VariantServiceDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.Transaction;
import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transaction-line-items")
public class TransactionLineItemController extends BaseRestController{
    @Autowired
    private TransactionLineItemService transactionLineItemService;

    @Autowired
    private VariantServiceService variantServiceService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("")
    public ResponseEntity<?> getAllTransactionLineItemByDeleted(@RequestParam(defaultValue = "-1") Integer status){
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
            List<TransactionLineItem> transactionLineItems;
            if (status == -1) {
                transactionLineItems = this.transactionLineItemService.getAllTransactionLineItem();
            } else if (status == 0) {
                transactionLineItems = this.transactionLineItemService.getAllTransactionLineItemByDeleted(false);
            } else {
                transactionLineItems = this.transactionLineItemService.getAllTransactionLineItemByDeleted(true);
            }
            List<TransactionLineItemDTOResponse> responses = transactionLineItems.stream()
                    .map(transactionLineItem -> new TransactionLineItemDTOResponse(transactionLineItem))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
    @GetMapping("/get-transaction-line-item-by-id")
    public ResponseEntity<?> getTransactionLineItemById(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        TransactionLineItem foundTransactionLineItem = this.transactionLineItemService.findTransactionLineItemById(id);
        if (ObjectUtils.isEmpty(foundTransactionLineItem)) {
            return super.error(ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getMessage());
        }
        return super.success(new TransactionLineItemDTOResponse(foundTransactionLineItem));
    }

    @GetMapping("/get-all-transaction-line-item-by-transaction-id-and-deleted")
    public ResponseEntity<?> getAllTransactionLineItemByTransactionIdAndDeleted(@RequestParam(name = "transactionId",
                                                                                required = false, defaultValue = "1") Long transactionId,
                                                                                @RequestParam(defaultValue = "-1") Integer status) {
        // status = 0 => get not deleted
        // status = 1 => get deleted
        // status = -1 => get all
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        Transaction foundTransaction = this.transactionService.findTransactionById(transactionId);
        if (ObjectUtils.isEmpty(foundTransaction)) {
            return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
        }
        List<TransactionLineItem> transactionLineItems;
        if (status == -1) {
            transactionLineItems = this.transactionLineItemService.findByTransactionId(transactionId);
        } else if (status == 0) {
            transactionLineItems = this.transactionLineItemService.findByTransactionIdAndDeleted(transactionId,false);
        } else {
            transactionLineItems = this.transactionLineItemService.findByTransactionIdAndDeleted(transactionId,true);
        }
        List<TransactionLineItemDTOResponse> responses = transactionLineItems.stream()
                .map(transactionLineItem -> new TransactionLineItemDTOResponse(transactionLineItem))
                .collect(Collectors.toList());
        return super.success(responses);
    }

    @GetMapping("/get-all-transaction-line-item-by-empty-transaction-and-deleted")
    public ResponseEntity<?> getAllTransactionLineItemByEmptyTransactionAndDeleted(@RequestParam(defaultValue = "-1") Integer status) {
        // status = 0 => get not deleted
        // status = 1 => get deleted
        // status = -1 => get all
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        Transaction foundTransaction = this.transactionService.findTransactionByFalseStatusFirst();
        if (ObjectUtils.isEmpty(foundTransaction)) {
            return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
        }
        List<TransactionLineItem> transactionLineItems;
        if (status == -1) {
            transactionLineItems = this.transactionLineItemService.findByTransactionId(foundTransaction.getId());
        } else if (status == 0) {
            transactionLineItems = this.transactionLineItemService.findByTransactionIdAndDeleted(foundTransaction.getId(),false);
        } else {
            transactionLineItems = this.transactionLineItemService.findByTransactionIdAndDeleted(foundTransaction.getId(),true);
        }
        List<TransactionLineItemDTOResponse> responses = transactionLineItems.stream()
                .map(transactionLineItem -> new TransactionLineItemDTOResponse(transactionLineItem))
                .collect(Collectors.toList());
        return super.success(responses);
    }

    @PutMapping("")
    public ResponseEntity<?> updateTransactionLineItemById(@RequestParam(name = "id", required = false,
                                                                        defaultValue = "1") Long id,
                                                           @RequestBody(required = false) Map<String, Object> newTransactionLineItem){
        try{
            if(ObjectUtils.isEmpty(newTransactionLineItem)
                    || ObjectUtils.isEmpty(newTransactionLineItem.get("quantity"))) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            int quantity = Integer.parseInt(newTransactionLineItem.get("quantity").toString());
            if(quantity < 0) {
                return super.error(ResponseCode.VALUE_LESS_THAN_ZERO.getCode(), ResponseCode.VALUE_LESS_THAN_ZERO.getMessage());
            }
            TransactionLineItem foundTransactionLineItem = this.transactionLineItemService.findTransactionLineItemById(id);
            if (ObjectUtils.isEmpty(foundTransactionLineItem)) {
                return super.error(ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getMessage());
            }
            VariantService foundVariantService = variantServiceService.findVariantServiceById(foundTransactionLineItem.getVariantService().getId());
            if(quantity > foundVariantService.getQuantity()) {
                return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
            }
            TransactionLineItem updatedTransactionLineItem = transactionLineItemService.updateTransactionLineItem(id, quantity);
            return super.success(new TransactionLineItemDTOResponse(updatedTransactionLineItem));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/decrement")
    public ResponseEntity<?> decrementTransactionLineItemById(@RequestParam(name = "id", required = false,
                                                                            defaultValue = "1") Long id){
        try{
            if(ObjectUtils.isEmpty(id)) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            TransactionLineItem foundTransactionLineItem = this.transactionLineItemService.findTransactionLineItemById(id);
            if (ObjectUtils.isEmpty(foundTransactionLineItem)) {
                return super.error(ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getMessage());
            }
            int quantity = foundTransactionLineItem.getQuantity() - 1;
            if(quantity < 1) {
                return super.error(ResponseCode.VALUE_LESS_THAN_ONE.getCode(), ResponseCode.VALUE_LESS_THAN_ONE.getMessage());
            }
            TransactionLineItem updatedTransactionLineItem = transactionLineItemService.updateTransactionLineItem(id, quantity);
            return super.success(new TransactionLineItemDTOResponse(updatedTransactionLineItem));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/increment")
    public ResponseEntity<?> incrementTransactionLineItemById(@RequestParam(name = "id", required = false,
                                                                            defaultValue = "1") Long id){
        try{
            if(ObjectUtils.isEmpty(id)) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            TransactionLineItem foundTransactionLineItem = this.transactionLineItemService.findTransactionLineItemById(id);
            if (ObjectUtils.isEmpty(foundTransactionLineItem)) {
                return super.error(ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_LINE_ITEM_NOT_FOUND.getMessage());
            }
            int quantity = foundTransactionLineItem.getQuantity() + 1;
            VariantService foundVariantService = variantServiceService.findVariantServiceById(foundTransactionLineItem.getVariantService().getId());
            if(quantity > foundVariantService.getQuantity()) {
                return super.error(ResponseCode.OUT_OF_QUANTITY.getCode(), ResponseCode.OUT_OF_QUANTITY.getMessage());
            }
            TransactionLineItem updatedTransactionLineItem = transactionLineItemService.updateTransactionLineItem(id, quantity);
            return super.success(new TransactionLineItemDTOResponse(updatedTransactionLineItem));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTransactionLineItem(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            TransactionLineItem foundTransactionLineItem = this.transactionLineItemService.findTransactionLineItemById(id);
            if (ObjectUtils.isEmpty(foundTransactionLineItem)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            if (foundTransactionLineItem.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            TransactionLineItem deletedTransactionLineItem = transactionLineItemService.deleteTransactionLineItem(id);
            return super.success(new TransactionLineItemDTOResponse(deletedTransactionLineItem));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/active")
    public ResponseEntity<?> activeTransactionLineItem(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            TransactionLineItem foundTransactionLineItem = this.transactionLineItemService.findTransactionLineItemById(id);
            if (ObjectUtils.isEmpty(foundTransactionLineItem)) {
                return super.error(ResponseCode.TRANSACTION_NOT_FOUND.getCode(), ResponseCode.TRANSACTION_NOT_FOUND.getMessage());
            }
            if (foundTransactionLineItem.getDeleted().equals(false)) {
                return super.error(ResponseCode.ACTIVED.getCode(), ResponseCode.ACTIVED.getMessage());
            }
            TransactionLineItem activeTransactionLineItem = transactionLineItemService.activeTransactionLineItem(id);
            return super.success(new TransactionLineItemDTOResponse(activeTransactionLineItem));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}
