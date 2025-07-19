package com.app.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.RoleRepository;
import com.app.dao.UserRepository;
import com.app.dto.ApiResponse;
import com.app.dto.UserSignupRequest;
import com.app.customException.UserHandlingException;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.requests.LoginRequest;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserService implements IUserService {

	@Autowired
	UserRepository usersRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public User addUser(User user) {
		user.setActive(true);
		user.setPassword(encoder.encode(user.getPassword()));
		return  usersRepo.save(user);
	}
	
	@Override
	public Role addRole(Role role) {
		// TODO Auto-generated method stub
		return roleRepo.save(role);
	}

	@Override
	public String linkUserRole(String email, UserRole role) {
		// TODO Auto-generated method stub
		//get user from email 
		User user = usersRepo.findByEmail(email).
		orElseThrow(() -> new RuntimeException("User Not Found!"));
		
		//get role from role name
		Role userRole = roleRepo.findByRole(role).
				orElseThrow(() -> new RuntimeException("Role Not Found!"));
		
		//add role to user
		user.getRoles().add(userRole);
		
		return "Linked role to user";
	}
	
	public Boolean loginUser(LoginRequest loginRequest) {
//	    Optional<Users> userOpt = usersRepo.findById(loginRequest.getEmail());
//
//	    if (userOpt.isEmpty()) {
//	        return false; 
//	    }
//
//	    Users user = userOpt.get();
//	    
//	    // Check password match
//	    return user.getPassword().equals(loginRequest.getPassword());
		return true;
	}
	
	
	
	@Override
	public boolean findUserByEmail(String email) {
		Optional<User> user = usersRepo.findByEmail(email);
//		User usr = userRepo.findByEmail(email)
//				   .orElseThrow(()-> new UserHandlingException("Duplicate User Entry: "+email+" Already Exist"));
		   if(user.isPresent()){
			return true;
		}
		 return false;
	}

	@Override
	public User getUserByEmail(String email) {
		User usr = usersRepo.findByEmail(email)
		   .orElseThrow(()-> new UserHandlingException("Use with : "+email+" Not Exist"));
		return usr;
	}
	
	//register user with password encoding in db
	
//	@Override
//	public ApiResponse registerNewUserWithPasswordEncoding(UserSignupRequest userDto) {
//		System.out.println(userDto);
//		User transientUser = modelMapper.map(userDto, User.class);
////	      transientUser.setRole("ROLE_"+userDto.getRole().toUpperCase());
//		 transientUser.setPassword(encoder.encode(userDto.getPassword()));
//		 System.out.println(transientUser);
//		 User persistentUser = usersRepo.save(transientUser);
//		return  new ApiResponse("User registered with ID: "+persistentUser.getId()+" Successfully!");
//	}
	
	
	

}
