package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.dto.AuthenDTORequest;
import com.bridal.WeddingBridalJavaBackend.dto.AuthenDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.UserDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.User;
import com.bridal.WeddingBridalJavaBackend.repository.UserRepository;
import com.bridal.WeddingBridalJavaBackend.rest.BaseRestController;
import com.bridal.WeddingBridalJavaBackend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/login")
public class AuthenController extends BaseRestController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody AuthenDTORequest authen) {
        try {
            this.authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(authen.getEmail(), authen.getPassword()));

            String token = JwtUtils.generateToken(authen.getEmail());
//            UserDTOResponse user = new UserDTOResponse(userRepository.findByEmail(authen.getEmail()).orElse(null));
//            AuthenDTOResponse response = new AuthenDTOResponse(token, "Successful login!", user);
            AuthenDTOResponse response = new AuthenDTOResponse(token, "Successful login!");
            return success(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return error(ResponseCode.FAILED_LOGIN.getCode(), ResponseCode.FAILED_LOGIN.getMessage());
    }
}
