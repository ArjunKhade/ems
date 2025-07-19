package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Employee;
import com.app.service.IEmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@CrossOrigin("http://localhost:4200/")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	@Autowired
	private IEmployeeService empService;
	
	public EmployeeController() {
		System.out.println("Emp contructor"+getClass());
	}

	//add request handling method
	@Operation(summary = "Returns list of all employess")
	@GetMapping
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getAllEmpDetails(){
		return new ResponseEntity<> (empService.getAllEmployees(),HttpStatus.OK);
	}
	
	//add request handling method
	@PostMapping
	public ResponseEntity <Employee> addEmpDetails(@RequestBody @Valid Employee e){
		Employee savedEmp = empService.addOrUpdateEmployeeDetails(e);
        return new ResponseEntity<>(savedEmp, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
		 try {
	            String msg = empService.deleteEmployeeDetails(id);
	            return new ResponseEntity<>(msg, HttpStatus.OK);
	        } catch (RuntimeException ex) {
	            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	        }
	}
	
	//add request handling method
		@GetMapping("/{empId}")
		public  ResponseEntity<?>  fetchEmpDetails(@PathVariable int empId){
//			try {
				return new ResponseEntity<> (empService.fetchEmpDetails(empId),HttpStatus.OK);
//			} catch (RuntimeException e) {
				// TODO: handle exception
//				return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//			}
		
		}
		//add request handling method
		@PutMapping
		public ResponseEntity <Employee> updateEmpDetails(@RequestBody Employee e){
			try {
	            Employee updatedEmp = empService.addOrUpdateEmployeeDetails(e);
	            return new ResponseEntity<>(updatedEmp, HttpStatus.OK);
	        } catch (RuntimeException ex) {
	            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	        }
		}
}
