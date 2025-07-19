import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../../app/constant/api.config';
import { Employee } from './model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  constructor() { }
  private employeeList = new BehaviorSubject<any[]>([]);
  employees$ = this.employeeList.asObservable();

  addEmployee(emp: Employee): Observable<any> {
    return this.http.post(BASE_URL, emp)
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(BASE_URL);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`, { responseType: 'text' });
  }

  updateEmployee(emp: Employee, empId: number): Observable<any> {
    emp.id = empId;
    return this.http.put(BASE_URL, emp)
  }

/**
 * Retrieves an employee's details by their unique ID.
 *
 * @param id - The unique identifier of the employee.
 * @returns An Observable containing the employee data.
 */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${BASE_URL}/${id}`);
  }

}
