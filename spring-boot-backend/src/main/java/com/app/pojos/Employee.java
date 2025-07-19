package com.app.pojos;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="employees")


public class Employee extends BaseEntity {

	@Column(length = 30)
	@NotBlank(message = "Name  is required")
	private String name;
	
	@Column(length = 30)
	@NotBlank(message = "Location is required")
	private String location;
	
	@Column(length = 30)
	@NotBlank(message = "Department is required")
	@JsonProperty("department")
	private String dept;

	
	public Employee() {
		
	}
	
	public Employee(String name, String location, String dept) {
		super();
		this.name = name;
		this.location = location;
		this.dept = dept;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	@Override
	public String toString() {
		return "Employee id"+getId()+"[name=" + name + ", location=" + location + ", dept=" + dept + "]";
	}
		
	
}
