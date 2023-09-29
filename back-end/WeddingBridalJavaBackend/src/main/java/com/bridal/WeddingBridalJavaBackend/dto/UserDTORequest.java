package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTORequest {
    private String firstName;
    private String lastName;
//    private String email;
//    private String password;
    private String phone;
    private String avatar;
    private String address;
    private Boolean gender;
    private String identityCard;

    public UserDTORequest(Map<String, Object> user) {
        this.firstName = user.get("firstName").toString();
        this.lastName = user.get("lastName").toString();
//        this.email = user.get("email").toString();
//        this.password = user.get("password").toString();
//        this.phone = user.get("phone").toString();
        this.avatar = user.get("avatar").toString();
        this.address = user.get("address").toString();
        this.gender = Boolean.parseBoolean(user.get("gender").toString());
        this.identityCard = user.get("identityCard").toString();
    }
}
