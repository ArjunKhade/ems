package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AssignRoleRequest;
import com.app.pojos.User;
import com.app.requests.LoginRequest;
import com.app.service.UserService;

@RestController
public class UsersController {

	@Autowired
	UserService userService;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addUser") 
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/loginUser")
	public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
	    return userService.loginUser(loginRequest);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/assignRole")
	public String assignRole(@RequestBody AssignRoleRequest request) {
	    return userService.linkUserRole(request.getEmail(),request.getRole());
	}

}
