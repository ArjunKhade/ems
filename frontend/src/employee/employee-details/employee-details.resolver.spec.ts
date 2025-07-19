import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { employeeDetailsResolver } from './employee-details.resolver';
import { Employee } from '../../employee/add-employee/model';

describe('employeeDetailsResolver', () => {
  const executeResolver: ResolveFn<Employee[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => employeeDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
