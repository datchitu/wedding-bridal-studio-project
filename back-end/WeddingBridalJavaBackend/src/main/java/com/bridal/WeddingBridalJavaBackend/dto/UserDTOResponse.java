package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Role;
import com.bridal.WeddingBridalJavaBackend.model.TransactionUser;
import com.bridal.WeddingBridalJavaBackend.model.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTOResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatar;
    private String address;
    private Boolean gender;
    private String identityCard;
    private Boolean deleted;
    private List<Map<String, Object>> transactionUsers;
    private List<Map<String, Object>> roles;

    public UserDTOResponse(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.avatar = user.getAvatar();
        this.address = user.getAddress();
        this.gender = user.getGender();
        this.identityCard = user.getIdentityCard();
        this.deleted = user.getDeleted();

        this.transactionUsers = new ArrayList<>();
        if(!ObjectUtils.isEmpty(user.getTransactionsUsers())) {
            for (TransactionUser transactionUser : user.getTransactionsUsers()) {
                this.transactionUsers.add(Map.of(
                        "transactionUserId",transactionUser.getId(),
                        "transactionUserPerformDatetime",transactionUser.getPerformDatetime(),
                        "transactionUserCreateAt",transactionUser.getCreatedAt(),
                        "transactionId",transactionUser.getTransaction().getId()
                ));
            }
        }
        this.roles = new ArrayList<>();
        if (!ObjectUtils.isEmpty(user.getRoles())) {
            for (Role role : user.getRoles()) {
                this.roles.add(Map.of(
                        "roleId",role.getId(),
                        "roleName",role.getRoleName()
                ));
            }
        }
    }
}
