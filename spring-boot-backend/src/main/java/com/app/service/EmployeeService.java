package com.app.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.customException.ResourceNotFoundException;
import com.app.dao.EmployeeRepository;
import com.app.pojos.Employee;

@Service
@Transactional
public class EmployeeService implements IEmployeeService {

	
	//dependency 
	@Autowired
	private EmployeeRepository employeeRepo;
	
	@Override
	public List<Employee> getAllEmployees() {
		// inherited api :
		return employeeRepo.findAll();
	}

	@Override
	public Employee addOrUpdateEmployeeDetails(Employee emp) {
		// TODO Auto-generated method stub
		return employeeRepo.save(emp);
	}

	@Override
	public String deleteEmployeeDetails(int id) {
		// TODO Auto-generated method stub
		 employeeRepo.deleteById(id);
		 return "Employee Details with ID " + id +"Deleted successfully..";
	}

	@Override
	public Employee fetchEmpDetails(int empId) {
		// TODO Auto-generated method stub 
		return employeeRepo.findById(empId)
				.orElseThrow(() -> new ResourceNotFoundException("Emp by ID "+ empId +" Not found"));
	}
	
	

}
