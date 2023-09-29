package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.Service.UserService;
import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.CategoryDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.UserDTORequest;
import com.bridal.WeddingBridalJavaBackend.dto.UserDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.User;
import com.bridal.WeddingBridalJavaBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController extends BaseRestController{
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("")
    public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "-1") Integer status,
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
            List<User> users;
            if (status == -1) {
                users = this.userService.getAllUser();
            } else if (status == 0) {
                users = this.userService.getAllUserByDeleted(false);
            } else {
                users = this.userService.getAllUserByDeleted(true);
            }
            int startIndex = (int) pageable.getOffset();
            int endIndex = Math.min((startIndex + pageable.getPageSize()), users.size());
            users = users.subList(startIndex, endIndex);
            List<UserDTOResponse> responses = users.stream()
                    .map(user -> new UserDTOResponse(user))
                    .collect(Collectors.toList());
            return super.success(responses);
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
    @PostMapping("")
    public ResponseEntity<?> addUser(@RequestBody(required = true) Map<String, Object> newUser) {
        try {
            if (ObjectUtils.isEmpty(newUser)) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }

            if (ObjectUtils.isEmpty(newUser.get("firstName"))
                    || ObjectUtils.isEmpty(newUser.get("lastName"))
                    || ObjectUtils.isEmpty(newUser.get("email"))
                    || ObjectUtils.isEmpty(newUser.get("password"))
                    || ObjectUtils.isEmpty(newUser.get("phone"))
                    || ObjectUtils.isEmpty(newUser.get("user_role"))) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }

            User foundUser = this.userService.findByEmail(newUser.get("email").toString()).orElse(null);
            if (!ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.DATA_ALREADY_EXISTS.getCode(),
                        ResponseCode.DATA_ALREADY_EXISTS.getMessage());
            }

            User insertedUser = userService.addUser(newUser);
            if (!ObjectUtils.isEmpty(insertedUser)) {
                return super.success(new UserDTOResponse(insertedUser));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/get-user-by-id-and-deleted")
    public ResponseEntity<?> getUserByIdAndDeleted(@RequestParam(name = "id", required = false) Long id,
                                                      @RequestParam(defaultValue = "-1") Integer status) {
        // status = 0 => get not deleted
        // status = 1 => get deleted
        // status = -1 => get all
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        User foundUser;
        if (status == -1) {
            foundUser = this.userService.findUserById(id);
        } else if (status == 0) {
            foundUser = this.userService.findUserByIdAndDeleted(id,false);
        } else {
            foundUser = this.userService.findUserByIdAndDeleted(id,true);
        }
        if (ObjectUtils.isEmpty(foundUser)) {
            return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
        }
        return super.success(new UserDTOResponse(foundUser));
    }

    @GetMapping("/get-user-by-email-and-deleted")
    public ResponseEntity<?> getUserByEmailAndDeleted(@RequestParam(name = "email", required = false) String email,
                                                      @RequestParam(defaultValue = "-1") Integer status) {
        // status = 0 => get not deleted
        // status = 1 => get deleted
        // status = -1 => get all
        if(!Arrays.asList(-1,0,1).contains(status)) {
            return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
        }
        User foundUser;
        if (status == -1) {
            foundUser = this.userService.findByEmail(email).orElse(null);
        } else if (status == 0) {
            foundUser = this.userService.findByEmailAndDeleted(email,false).orElse(null);
        } else {
            foundUser = this.userService.findByEmailAndDeleted(email,true).orElse(null);
        }
        if (ObjectUtils.isEmpty(foundUser)) {
            return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
        }
        return super.success(new UserDTOResponse(foundUser));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestParam(name = "email", required = false, defaultValue = "1") String email,
                                        @RequestBody(required = false) Map<String, Object> newUser) {
        try {
            if (ObjectUtils.isEmpty(email)
                || ObjectUtils.isEmpty(newUser)) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            UserDTORequest userDTORequest = new UserDTORequest(newUser);
            if (ObjectUtils.isEmpty(userDTORequest.getFirstName())
                    || ObjectUtils.isEmpty(userDTORequest.getLastName())
                    || ObjectUtils.isEmpty(userDTORequest.getAvatar())
                    || ObjectUtils.isEmpty(userDTORequest.getAddress())
                    || ObjectUtils.isEmpty(userDTORequest.getGender())
                    || ObjectUtils.isEmpty(userDTORequest.getIdentityCard())) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }

            User foundUser = this.userService.findByEmail(email).orElse(null);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }

            User updatedUser = userService.updateUser(email, newUser);
            if (!ObjectUtils.isEmpty(updatedUser)) {
                return super.success(new UserDTOResponse(updatedUser));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePasswordByEmail(@RequestParam(name = "email", required = false) String email,
                                                   @RequestParam(name = "password", required = false) String password,
                                                   @RequestParam(name = "mewPassword", required = false) String newPassword) {
        try {
            if (ObjectUtils.isEmpty(email)
                    || ObjectUtils.isEmpty(password)
                    || ObjectUtils.isEmpty(newPassword)) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            User foundUser = this.userService.findByEmail(email).orElse(null);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            if (!this.passwordEncoder.matches(password,foundUser.getPassword()) ) {
                return super.error(ResponseCode.PASSWORD_NOT_MATCH.getCode(), ResponseCode.PASSWORD_NOT_MATCH.getMessage());
            }
            if (this.passwordEncoder.matches(newPassword,foundUser.getPassword())) {
                return super.error(ResponseCode.DUPLICATE_OLD_PASSWORD.getCode(), ResponseCode.DUPLICATE_OLD_PASSWORD.getMessage());
            }
            User changePasswordUser = userService.changePassword(email, newPassword);
            return super.success(new UserDTOResponse(changePasswordUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam(name = "id", required = false, defaultValue = "1") Long id){
        try{
            User foundUser = this.userService.findUserById(id);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            if (foundUser.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            User deleteUser = userService.deleteUser(id);
            return super.success(new UserDTOResponse(deleteUser));
        }catch(Exception e){
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PutMapping("/active")
    public ResponseEntity<?> activeUser(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            User foundUser = this.userService.findUserById(id);
            if (ObjectUtils.isEmpty(foundUser)) {
                return super.error(ResponseCode.USER_NOT_FOUND.getCode(), ResponseCode.USER_NOT_FOUND.getMessage());
            }
            if (foundUser.getDeleted().equals(false)) {
                return super.error(ResponseCode.ACTIVED.getCode(), ResponseCode.ACTIVED.getMessage());
            }
            User activeUser = userService.activeUser(id);
            return super.success(new UserDTOResponse(activeUser));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}
