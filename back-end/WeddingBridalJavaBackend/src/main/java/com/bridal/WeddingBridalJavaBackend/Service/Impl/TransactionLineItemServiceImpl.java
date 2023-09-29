package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.TransactionLineItemService;
import com.bridal.WeddingBridalJavaBackend.Service.VariantServiceService;
import com.bridal.WeddingBridalJavaBackend.model.TransactionLineItem;
import com.bridal.WeddingBridalJavaBackend.model.VariantService;
import com.bridal.WeddingBridalJavaBackend.repository.TransactionLineItemRepository;
import com.bridal.WeddingBridalJavaBackend.repository.VariantServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TransactionLineItemServiceImpl implements TransactionLineItemService {
    @Autowired
    private TransactionLineItemRepository transactionLineItemRepository;
    @Autowired
    private VariantServiceService variantServiceService;

    @Override
    public List<TransactionLineItem> getAllTransactionLineItem() {
        return this.transactionLineItemRepository.findAll();
    }

    @Override
    public List<TransactionLineItem> getAllTransactionLineItemByDeleted(Boolean deleted) {
        return this.transactionLineItemRepository.findAllByDeleted(deleted);
    }

    @Override
    public TransactionLineItem findTransactionLineItemById(Long id) {
        return this.transactionLineItemRepository.findById(id).orElse(null);
    }

    @Override
    public List<TransactionLineItem> findByTransactionId(Long transactionId) {
        return this.transactionLineItemRepository.findAllByTransaction_Id(transactionId);
    }

    @Override
    public List<TransactionLineItem> findByTransactionIdAndDeleted(Long transactionId, Boolean deleted) {
        return this.transactionLineItemRepository.findAllByTransaction_IdAndDeleted(transactionId, deleted);
    }

    @Override
    public TransactionLineItem findTransactionLineItem(List<TransactionLineItem> transactionItems,
                                                       Long variantServiceId) {
        if (transactionItems == null){
            return null;
        }
        TransactionLineItem transactionItem = null;
//        VariantService foundVariantService = this.variantServiceService.findVariantServiceById(variantServiceId);
        for (TransactionLineItem item : transactionItems) {
            if (item.getVariantService().getId() == variantServiceId) {
                transactionItem = item;
            }
        }
        return transactionItem;
    }



    @Override
    public TransactionLineItem updateTransactionLineItem(Long id, int quantity) {
        TransactionLineItem transactionLineItem = this.findTransactionLineItemById(id);
        VariantService variantService = variantServiceService.findVariantServiceById(transactionLineItem.getVariantService().getId());
        transactionLineItem.setQuantity(quantity);
        transactionLineItem.setTotalPrice(quantity * variantService.getPrice());
        return this.transactionLineItemRepository.save(transactionLineItem);
    }

    @Override
    public TransactionLineItem deleteTransactionLineItem(Long id) {
        TransactionLineItem transactionLineItem = this.findTransactionLineItemById(id);
        transactionLineItem.setDeleted(true);
        transactionLineItem.setQuantity(0);
        transactionLineItem.setTotalPrice(0.0);
        return this.transactionLineItemRepository.save(transactionLineItem);
    }

    @Override
    public TransactionLineItem activeTransactionLineItem(Long id) {
        TransactionLineItem transactionLineItem = this.findTransactionLineItemById(id);
        transactionLineItem.setDeleted(false);
        return this.transactionLineItemRepository.save(transactionLineItem);
    }

    @Override
    public double totalPrice(List<TransactionLineItem> transactionLineItems){
        double totalPrice = 0.0;

        for(TransactionLineItem transactionLineItem : transactionLineItems){
            totalPrice += transactionLineItem.getQuantity() * transactionLineItem.getVariantService().getPrice();
        }
        return totalPrice;
    }

}
