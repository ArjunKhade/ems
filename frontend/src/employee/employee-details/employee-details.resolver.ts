import { ResolveFn } from '@angular/router';
import { Employee } from '../../employee/add-employee/model';
import { EmployeeService } from '../../employee/add-employee/employee.service';
import { inject } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * @description
 * Resolves a list of employees before activating the route.
 * 
 * This resolver ensures that employee data is loaded before the route
 * is rendered. If the API call fails, it returns an empty array to
 * prevent navigation failure.
 * 
 * @param route The route snapshot.
 * @param state The router state snapshot.
 * @returns An Observable of Employee array, or an empty array on error.
 */
export const employeeDetailsResolver: ResolveFn<Employee[]> = (_route, _state) => {
  const employeeService = inject(EmployeeService);
  const spinnerService = inject(NgxSpinnerService);
  spinnerService.show();
  return employeeService.getEmployee().pipe(
    catchError((error) => {
      // Optionally log the error or notify the user
      console.error('Failed to load employee data:', error);
      return of([]);
    }), finalize(() => {
      spinnerService.hide();
    })
  );
};
