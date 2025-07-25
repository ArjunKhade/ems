package com.app.service;

import java.util.List;

import com.app.pojos.Employee;

public interface IEmployeeService {
	
	List<Employee> getAllEmployees();
	
	Employee addOrUpdateEmployeeDetails(Employee transientEmp);
	
	String deleteEmployeeDetails(int id);

	Employee fetchEmpDetails(int empId);
}
