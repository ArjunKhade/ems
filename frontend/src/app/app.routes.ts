import { Routes } from '@angular/router';
import { ROUTE_PATHS } from './constant/route.constant';
import { employeeDetailsResolver } from '../employee/employee-details/employee-details.resolver';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.MAIN,
    loadComponent: () => import('../templates/main-template/main-template.component').then(
      (m) => m.MainTemplateComponent
    )
  },
  {
    path: ROUTE_PATHS.EMPLOYEE_FORM,
    loadComponent: () => import('../employee/add-employee/add-employee.component').then(
      (m) => m.AddEmployeeComponent
    )
  },
  
  {
    path: ROUTE_PATHS.LOGIN,
    loadComponent: () => import('../auth/login/login.component').then(
      (m) => m.LoginComponent
    )
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    loadComponent: () => import('../auth/sign-up/sign-up.component').then(
      (m) => m.SignUpComponent
    )
  },
  
  {
    path: ROUTE_PATHS.EMPLOYEE_DETAILS,
    loadComponent: () => import('../employee/employee-details/employee-details.component').then(
      (m) => m.EmployeeDetailsComponent
    ),
    resolve: {
      employeeData: employeeDetailsResolver
    }
  },
  { path: '', redirectTo: ROUTE_PATHS.MAIN, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTE_PATHS.MAIN }
];