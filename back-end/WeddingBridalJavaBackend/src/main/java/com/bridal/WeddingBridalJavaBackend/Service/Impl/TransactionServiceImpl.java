package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.*;
import com.bridal.WeddingBridalJavaBackend.model.*;
import com.bridal.WeddingBridalJavaBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.*;

@Service
public class TransactionServiceImpl implements TransactionService {
    Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());
//    Timestamp ts = Timestamp.from(new Date().toInstant());

    DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionLineItemRepository transactionLineItemRepository;

    @Autowired
    private TransactionLineItemService transactionLineItemService;

    @Autowired
    private VariantServiceRepository variantServiceRepository;

    @Autowired
    private VariantServiceService variantServiceService;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private TransactionUserService transactionUserService;

    @Autowired
    private TransactionUserRepository transactionUserRepository;

    @Override
    public Transaction findTransactionById(Long id) {
        return this.transactionRepository.findById(id).orElse(null);
    }

    @Override
    public Transaction findTransactionByIdAndDeleted(Long id, Boolean deleted) {
        return this.transactionRepository.findByIdAndDeleted(id, deleted);
    }

    @Override
    public List<Transaction> getAllTransaction() {
        return this.transactionRepository.findAll();
    }

    @Override
    public List<Transaction> getAllTransactionByDeleted(Boolean deleted) {
        return this.transactionRepository.findAllByDeleted(deleted);
    }

    @Override
    public List<Transaction> getAllTransactionByStatus(Boolean status) {
        return this.transactionRepository.findAllByStatus(status);
    }

    @Override
    public List<Transaction> getAllTransactionByStatusAndDeleted(Boolean status, Boolean deleted) {
        return this.transactionRepository.findAllByStatusAndDeleted(status, deleted);
    }

    @Override
    public List<Transaction> getAllTransactionByPaymentStatus(Boolean paymentStatus) {
        return this.transactionRepository.findAllByPaymentStatus(paymentStatus);
    }

    @Override
    public List<Transaction> getAllTransactionByPaymentStatusAndDeleted(Boolean paymentStatus, Boolean deleted) {
        return this.transactionRepository.findAllByPaymentStatusAndDeleted(paymentStatus, deleted);
    }

    @Override
    public List<Transaction> getAllTransactionByPaymentType(Boolean paymentType) {
        return this.transactionRepository.findAllByPaymentType(paymentType);
    }

    @Override
    public List<Transaction> getAllTransactionByPaymentTypeAndDeleted(Boolean paymentType, Boolean deleted) {
        return this.transactionRepository.findAllByPaymentTypeAndDeleted(paymentType, deleted);
    }

    @Override
    public Optional<Transaction> findTransactionByStatus(Boolean status) {
        return this.transactionRepository.findByStatus(status);
    }

    @Override
    public Transaction createTransaction() {
        Transaction transaction = new Transaction();
        transaction.setDeleted(false);
        transaction.setPaymentStatus(false);
        transaction.setStatus(false);
        transaction.setPaymentType(false);
        transaction.setTotalPrice(0.0);
        return this.transactionRepository.save(transaction);
    }

    @Override
    public Transaction findTransactionByFalseStatusFirst() {
        List<Transaction> transactions = this.getAllTransactionByStatus(false);
        return transactions.stream().findFirst().orElse(null);
    }

    @Override
    public Transaction addVariantServiceToTransaction(VariantService variantService, int quantity) {
        Long id = this.findTransactionByFalseStatusFirst().getId();
        Transaction transaction = this.findTransactionById(id);
        List<TransactionLineItem> transactionLineItems = transaction.getTransactionLineItems();
        TransactionLineItem transactionLineItem = transactionLineItemService.findTransactionLineItem(transactionLineItems, variantService.getId());
        if (ObjectUtils.isEmpty(transactionLineItems)) {
            transactionLineItems = new ArrayList<>();
            if (transactionLineItem == null) {
                transactionLineItem = new TransactionLineItem();
                transactionLineItem.setVariantService(variantService);
                transactionLineItem.setTotalPrice(quantity * variantService.getPrice());
                transactionLineItem.setQuantity(quantity);
//                variantService.setQuantity(variantService.getQuantity() - quantity);
                transactionLineItem.setDeleted(false);
                transactionLineItem.setTransaction(transaction);
                transactionLineItems.add(transactionLineItem);
//                variantServiceRepository.save(variantService);
                transactionLineItemRepository.save(transactionLineItem);
            }
        } else {
            if (transactionLineItem == null) {
                transactionLineItem = new TransactionLineItem();
                transactionLineItem.setVariantService(variantService);
                transactionLineItem.setTotalPrice(quantity * variantService.getPrice());
                transactionLineItem.setQuantity(quantity);
//                variantService.setQuantity(variantService.getQuantity() - quantity);
                transactionLineItem.setDeleted(false);
                transactionLineItem.setTransaction(transaction);
                transactionLineItems.add(transactionLineItem);
//                variantServiceRepository.save(variantService);
                transactionLineItemRepository.save(transactionLineItem);
            } else {
                transactionLineItem.setQuantity(transactionLineItem.getQuantity() + quantity);
//                variantService.setQuantity(variantService.getQuantity() - quantity);
                transactionLineItem.setTotalPrice(transactionLineItem.getTotalPrice() + ( quantity * variantService.getPrice()));
//                variantServiceRepository.save(variantService);
                transactionLineItem.setDeleted(false);
                transactionLineItemRepository.save(transactionLineItem);
            }
        }
        transaction.setTransactionLineItems(transactionLineItems);
        return this.transactionRepository.save(transaction);
    }
    @Override
    public Transaction orderTransaction(Map<String, Object> newTransaction, Voucher voucher, User user) throws ParseException {
        Long id = this.findTransactionByFalseStatusFirst().getId();
        Transaction transaction = this.findTransactionById(id);
        transaction.setCreatedAt(ts);
        transaction.setNote(newTransaction.get("note").toString());
        transaction.setPaymentType(false);
        transaction.setPaymentStatus(false);
        transaction.setStatus(true);
//        transaction.setTotalPrice(Double.parseDouble(newTransaction.get("totalPrice").toString()));
        transaction.setTotalPrice(this.totalPrice(id));
        transaction.setVoucher(voucher);
        Long voucherId = transaction.getVoucher().getId();
        decrementQuantityVoucherService(voucherId);
//        List<TransactionUser> transactionUsers = new ArrayList<>();
//        TransactionUser transactionUser = new TransactionUser();
//        transactionUser.setUser(user);
//        transactionUser.setTransaction(transaction);
//        format.setLenient(false);
//        transactionUser.setPerformDatetime(format.parse(newTransaction.get("performDate").toString()));
//        transactionUser.setCreatedAt(ts);
//        transactionUser.setDeleted(false);
//        transactionUser.setStatus(false);
//        transactionUsers.add(transactionUser);
//        transactionUserRepository.save(transactionUser);
        List<TransactionUser> transactionUsers = this.transactionUserService.createListTransactionUser(transaction, user, newTransaction.get("performDate").toString());
        transaction.setTransactionsUsers(transactionUsers);
        return this.transactionRepository.save(transaction);
    }

    @Override
    public Transaction orderTransactionNonVoucher(Map<String, Object> newTransaction, User user) throws ParseException {
        Long id = this.findTransactionByFalseStatusFirst().getId();
        Transaction transaction = this.findTransactionById(id);
        transaction.setCreatedAt(ts);
        transaction.setNote(newTransaction.get("note").toString());
        transaction.setPaymentType(false);
        transaction.setPaymentStatus(false);
        transaction.setStatus(true);
//        transaction.setTotalPrice(Double.parseDouble(newTransaction.get("totalPrice").toString()));

        List<TransactionUser> transactionUsers = this.transactionUserService.createListTransactionUser(transaction, user, newTransaction.get("performDate").toString());
        transaction.setTransactionsUsers(transactionUsers);
        return this.transactionRepository.save(transaction);
    }

    @Override
    public Transaction paymentTransaction(Map<String, Object> newTransaction,
                                          Voucher voucher, User user) throws ParseException {
        Long id = this.findTransactionByFalseStatusFirst().getId();
        Transaction transaction = this.findTransactionById(id);
        decrementQuantityVariantService(id);
        transaction.setNote(newTransaction.get("note").toString());
        transaction.setPaymentType(true);
        transaction.setPaymentStatus(true);
        transaction.setStatus(true);
//        transaction.setTotalPrice(Double.parseDouble(newTransaction.get("totalPrice").toString()));
        transaction.setTotalPrice(this.totalPrice(id));
        transaction.setVoucher(voucher);
        Long voucherId = transaction.getVoucher().getId();
        decrementQuantityVoucherService(voucherId);
        transaction.setCreatedAt(ts);
        transaction.setPaidAt(ts);
        List<TransactionUser> transactionUsers = this.transactionUserService.createListTransactionUser(transaction, user, newTransaction.get("performDate").toString());
        transaction.setTransactionsUsers(transactionUsers);
        return this.transactionRepository.save(transaction);
    }

    @Override
    public Transaction paymentTransactionNonVoucher(Map<String, Object> newTransaction, User user) throws ParseException {
        Long id = this.findTransactionByFalseStatusFirst().getId();
        Transaction transaction = this.findTransactionById(id);
        decrementQuantityVariantService(id);
        transaction.setNote(newTransaction.get("note").toString());
        transaction.setPaymentType(true);
        transaction.setPaymentStatus(true);
        transaction.setStatus(true);
//        transaction.setTotalPrice(Double.parseDouble(newTransaction.get("totalPrice").toString()));
        transaction.setTotalPrice(this.totalPrice(id));
        transaction.setCreatedAt(ts);
        transaction.setPaidAt(ts);
        this.totalPrice(id);
        List<TransactionUser> transactionUsers = this.transactionUserService.createListTransactionUser(transaction, user, newTransaction.get("performDate").toString());
        transaction.setTransactionsUsers(transactionUsers);
        return this.transactionRepository.save(transaction);
    }

    @Override
    public Transaction updateTransaction(Long id, String note) throws ParseException {
        Transaction transaction = this.findTransactionById(id);
        decrementQuantityVariantService(id);
        transaction.setNote(note);
        transaction.setPaymentType(true);
        transaction.setPaymentStatus(true);
        transaction.setPaidAt(ts);
        transaction.setUpdatedAt(ts);
        return this.transactionRepository.save(transaction);
    }
    @Override
    public Transaction deleteTransaction(Long id) {
        Transaction transaction = this.findTransactionById(id);
        transaction.setDeleted(true);
        transaction.setUpdatedAt(ts);
        return this.transactionRepository.save(transaction);
    }
    @Override
    public Transaction activeTransaction(Long id) {
        Transaction transaction = this.findTransactionById(id);
        transaction.setDeleted(false);
        transaction.setUpdatedAt(ts);
        return this.transactionRepository.save(transaction);
    }

    public void decrementQuantityVariantService(Long id) {
        Transaction transaction = findTransactionById(id);
        List<TransactionLineItem> transactionLineItems = transaction.getTransactionLineItems();
        for(TransactionLineItem transactionLineItem : transactionLineItems) {
            VariantService variantService = variantServiceService.findVariantServiceById(transactionLineItem.getVariantService().getId());
            variantService.setQuantity(variantService.getQuantity() - transactionLineItem.getQuantity());
            this.variantServiceRepository.save(variantService);
        }
    }

    public void decrementQuantityVoucherService(Long voucherId) {
        Voucher voucher = this.voucherService.findVoucherById(voucherId);
        voucher.setQuantity(voucher.getQuantity() -1);
        this.voucherRepository.save(voucher);
    }

    @Override
    public Transaction setTotalPriceEmptyTransaction(Long id) {
        Transaction transaction = this.findTransactionById(id);
        List<TransactionLineItem> transactionLineItems = transaction.getTransactionLineItems();
        double totalPrice = 0.0;
        for(TransactionLineItem transactionLineItem : transactionLineItems){
            totalPrice += transactionLineItem.getTotalPrice();
        }
        transaction.setTotalPrice(totalPrice);
        return this.transactionRepository.save(transaction);
    }

    private double totalPrice(Long id) {
        Transaction transaction = findTransactionById(id);
        List<TransactionLineItem> transactionLineItems = transaction.getTransactionLineItems();
        double totalPrice = 0.0;
        for(TransactionLineItem transactionLineItem : transactionLineItems){
            totalPrice += transactionLineItem.getTotalPrice();
        }
        return totalPrice;
    }
}
