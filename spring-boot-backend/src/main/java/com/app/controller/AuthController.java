package com.app.controller;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.ApiResponse;
import com.app.dto.AuthResp;
import com.app.dto.UserLoginRequest;
import com.app.dto.UserSignupRequest;
import com.app.jwt_utils.JwtUtils;
import com.app.pojos.User;
import com.app.service.IUserService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@PermitAll
public class AuthController {
	
         @Autowired
         private JwtUtils utils;
         
         @Autowired
         private AuthenticationManager manager;
         
         @Autowired
         private IUserService userService;
         
         @Autowired
     	private ModelMapper modelMapper;
         
         //register new user with password encoding
      	@PostMapping("/signup")
      	public ResponseEntity<?>registerUser( @Valid @RequestBody  User request){
      		System.out.println(request);
      		 boolean findUserByEmail = userService.findUserByEmail(request.getEmail());
      		 if(!findUserByEmail) {
      		  return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(request));
      		}else {
      			return new ResponseEntity<ApiResponse>(new ApiResponse("Duplicate User Entry Email Id Already Exist!!!!"),HttpStatus.BAD_REQUEST);
     		}
      		 
      	}
         
   
     @PostMapping("/login")
     public ResponseEntity<?> validateUserCreateToken(@Valid @RequestBody  UserLoginRequest request){
    	 UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword());
    	 try {
 			// authenticate the credentials
 			Authentication authenticatedDetails = manager.authenticate(authToken);
 			// => auth succcess
 			User user = userService.getUserByEmail(request.getEmail());
 			return ResponseEntity.ok(new AuthResp(utils.generateJwtToken(authenticatedDetails),user.getId(),user.getName()));
 		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
 			// send back err resp code
 			System.out.println("err "+e);
 			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
 		}
     }
         
}
