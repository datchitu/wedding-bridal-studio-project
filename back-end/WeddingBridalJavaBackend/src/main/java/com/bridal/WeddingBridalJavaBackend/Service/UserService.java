package com.bridal.WeddingBridalJavaBackend.Service;

import com.bridal.WeddingBridalJavaBackend.model.User;
import com.bridal.WeddingBridalJavaBackend.model.Voucher;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {
    List<User> getAllUser();

    List<User> getAllUserByDeleted(boolean deleted);

    User findUserById(long id);

    User findUserByIdAndDeleted(long id, boolean deleted);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndDeleted(String email, boolean deleted);

    User addUser(Map<String, Object> newUser);

    User updateUser(String email, Map<String, Object> newUser);

    User changePassword(String email, String newPassword);

    User deleteUser(Long id);

    User activeUser(Long id);
}
