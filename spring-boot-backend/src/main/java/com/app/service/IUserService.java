package com.app.service;

import com.app.dto.UserSignupRequest;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserRole;

public interface IUserService {

	User addUser(UserSignupRequest user);
	
	Role addRole (Role role);
	
	String linkUserRole (String userName, UserRole roleName);
	
	 //duplicate user entry
    boolean findUserByEmail(String email);
    
    User getUserByEmail(String email);
	
}
