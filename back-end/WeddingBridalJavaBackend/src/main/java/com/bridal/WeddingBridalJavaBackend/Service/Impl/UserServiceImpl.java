package com.bridal.WeddingBridalJavaBackend.Service.Impl;

import com.bridal.WeddingBridalJavaBackend.Service.UserService;
import com.bridal.WeddingBridalJavaBackend.model.User;
import com.bridal.WeddingBridalJavaBackend.repository.RoleRepository;
import com.bridal.WeddingBridalJavaBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private Timestamp ts = Timestamp.from(ZonedDateTime.now().toInstant());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAllUser() {
        return this.userRepository.findAll();
    }

    @Override
    public List<User> getAllUserByDeleted(boolean deleted) {
        return userRepository.findAllByDeleted(deleted);
    }

    @Override
    public User findUserById(long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findUserByIdAndDeleted(long id, boolean deleted) {
        return userRepository.findByIdAndDeleted(id, deleted).orElse(null);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByEmailAndDeleted(String email, boolean deleted) {
        return userRepository.findByEmailAndDeleted(email, deleted);
    }

    @Override
    public User addUser(Map<String, Object> newUser) {
        User user = new User();
        user.setFirstName(newUser.get("firstName").toString());
        user.setLastName(newUser.get("lastName").toString());
        user.setEmail(newUser.get("email").toString());
        user.setPassword(this.passwordEncoder.encode(newUser.get("password").toString()));
        user.setPhone(newUser.get("phone").toString());
        user.setGender(false);
        user.setDeleted(false);
        user.setAvatar("./images/avatar-default.jpg");
        user.setRoles(this.roleRepository.findByRoleName(newUser.get("user_role").toString()));
        return this.userRepository.save(user);
    }

    @Override
    public User updateUser(String email, Map<String, Object> newUser) {
        User user = this.findByEmail(email).orElse(null);
        user.setFirstName(newUser.get("firstName").toString());
        user.setLastName(newUser.get("lastName").toString());
        user.setAvatar(newUser.get("avatar").toString());
        user.setAddress(newUser.get("address").toString());
        user.setGender(Boolean.parseBoolean(newUser.get("gender").toString()));
        user.setIdentityCard(newUser.get("identityCard").toString());
        user.setUpdatedAt(ts);
        return this.userRepository.save(user);
    }

    @Override
    public User changePassword(String email, String newPassword) {
        User user = this.findByEmail(email).orElse(null);
        user.setPassword(this.passwordEncoder.encode(newPassword));
        user.setUpdatedAt(ts);
        return this.userRepository.save(user);
    }

    @Override
    public User deleteUser(Long id) {
        User user = this.findUserById(id);
        user.setDeleted(true);
        user.setUpdatedAt(ts);
        return this.userRepository.save(user);
    }

    @Override
    public User activeUser(Long id) {
        User user = this.findUserById(id);
        user.setDeleted(false);
        user.setUpdatedAt(ts);
        return this.userRepository.save(user);
    }


}
