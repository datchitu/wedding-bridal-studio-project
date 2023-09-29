package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.TransactionUserService;
import com.bridal.WeddingBridalJavaBackend.Service.UserService;
import com.bridal.WeddingBridalJavaBackend.model.*;
import com.bridal.WeddingBridalJavaBackend.repository.TransactionUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.*;

@Service
public class TransactionUserServiceImpl implements TransactionUserService {
    Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());

    DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private TransactionUserRepository transactionUserRepository;

    @Autowired
    private UserService userService;

    @Override
    public TransactionUser findTransactionUserById(Long id) {
        return this.transactionUserRepository.findById(id).orElse(null);
    }

    @Override
    public TransactionUser findTransactionUserByIdAndDeleted(Long id, Boolean deleted) {
        return this.transactionUserRepository.findByIdAndDeleted(id, deleted);
    }

    @Override
    public List<TransactionUser> findAllTransactionUserByUserId(Long userId) {
        return this.transactionUserRepository.findAllByUser_Id(userId);
    }

    @Override
    public List<TransactionUser> findAllTransactionUserByUserIdAndDeleted(Long userId, Boolean deleted) {
        return this.transactionUserRepository.findAllByUser_IdAndDeleted(userId, deleted);
    }

    @Override
    public List<TransactionUser> findAllTransactionUserByTransactionId(Long transactionId) {
        return this.transactionUserRepository.findAllByTransaction_Id(transactionId);
    }

    @Override
    public List<TransactionUser> findAllTransactionUserByTransactionIdAndDeleted(Long transactionId, Boolean deleted) {
        return this.transactionUserRepository.findAllByTransaction_IdAndDeleted(transactionId, deleted);
    }

    @Override
    public List<TransactionUser> getAllTransactionUser() {
        return this.transactionUserRepository.findAll();
    }

    @Override
    public List<TransactionUser> getAllTransactionUserByDeleted(Boolean deleted) {
        return this.transactionUserRepository.findAllByDeleted(deleted);
    }

    @Override
    public TransactionUser getTransactionUserByTransactionIdAndUserId(Long transactionId, Long userId) {
        return this.transactionUserRepository.findByTransaction_IdAndUser_Id(transactionId, userId).orElse(null);
    }

    @Override
    public TransactionUser addTransactionUser(Map<String, Object> newTransactionUser,User user ,Transaction transaction) throws ParseException{
        TransactionUser transactionUser = new TransactionUser();
        format.setLenient(false);
        transactionUser.setPerformDatetime(format.parse(newTransactionUser.get("performDatetime").toString()));
        transactionUser.setDeleted(false);
        transactionUser.setUser(user);
        transactionUser.setStatus(false);
        transactionUser.setTransaction(transaction);
        return this.transactionUserRepository.save(transactionUser);
    }

    @Override
    public List<TransactionUser> createListTransactionUser(Transaction transaction, User user, String performDate) throws ParseException {
        List<TransactionUser> transactionUsers = new ArrayList<>();
        TransactionUser transactionUser = new TransactionUser();
        transactionUser.setUser(user);
        transactionUser.setTransaction(transaction);
        format.setLenient(false);
        transactionUser.setPerformDatetime(format.parse(performDate));
        transactionUser.setCreatedAt(ts);
        transactionUser.setDeleted(false);
        transactionUser.setStatus(false);
        transactionUsers.add(transactionUser);
        transactionUserRepository.save(transactionUser);
        return transactionUsers;
    }

    @Override
    public TransactionUser updateTransactionUser(Long id, Map<String, Object> newTransactionUser, User user) throws ParseException{
        TransactionUser transactionUser = this.findTransactionUserById(id);
        format.setLenient(false);
        transactionUser.setPerformDatetime(format.parse(newTransactionUser.get("performDatetime").toString()));
        transactionUser.setUser(user);
        transactionUser.setUpdatedAt(ts);
        return this.transactionUserRepository.save(transactionUser);
    }

    @Override
    public TransactionUser updatePerformDate(Long id, Date performDatetime) throws ParseException{
        TransactionUser transactionUser = this.findTransactionUserById(id);
        transactionUser.setPerformDatetime(performDatetime);
        transactionUser.setUpdatedAt(ts);
        return this.transactionUserRepository.save(transactionUser);
    }

    @Override
    public TransactionUser completeTransactionUser(Long id) {
        TransactionUser transactionUser = this.findTransactionUserById(id);
        transactionUser.setStatus(true);
        transactionUser.setUpdatedAt(ts);
        return this.transactionUserRepository.save(transactionUser);
    }

    @Override
    public TransactionUser deleteTransactionUser(Long id) {
        TransactionUser transactionUser = this.findTransactionUserById(id);
        transactionUser.setDeleted(true);
        transactionUser.setUpdatedAt(ts);
        return this.transactionUserRepository.save(transactionUser);
    }

    @Override
    public TransactionUser activeTransactionUser(Long id) {
        TransactionUser transactionUser = this.findTransactionUserById(id);
        transactionUser.setDeleted(false);
        transactionUser.setUpdatedAt(ts);
        return this.transactionUserRepository.save(transactionUser);
    }
}
