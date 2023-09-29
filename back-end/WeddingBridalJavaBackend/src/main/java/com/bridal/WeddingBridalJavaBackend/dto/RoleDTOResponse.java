package com.bridal.WeddingBridalJavaBackend.dto;

import com.bridal.WeddingBridalJavaBackend.model.Role;
import com.bridal.WeddingBridalJavaBackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class RoleDTOResponse {
    private Long id;
    private String roleName;
    private List<Map<String, Object>> users;

    public RoleDTOResponse(Role role) {
        this.id = role.getId();
        this.roleName = role.getRoleName();

        this.users = new ArrayList<>();
        if(!ObjectUtils.isEmpty(role.getUsers())){
            for (User user : role.getUsers()) {
                this.users.add(Map.of("userId", user.getId(),
                        "userEmail", user.getEmail()));
            }
        }
    }
}
