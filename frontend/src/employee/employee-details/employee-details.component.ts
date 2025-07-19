import { Component, computed, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../employee/add-employee/employee.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Employee } from '../../employee/add-employee/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app/app.service';
import { SweetAlertService } from '../../app/common/sweet-alert.service';
import { MainTemplateComponent } from "../../templates/main-template/main-template.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSortModule, Sort, MatSort } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  providers: [EmployeeService],
  imports: [NgxSpinnerModule, CommonModule, MatSortModule, MatProgressSpinnerModule, MatButtonModule, MatDividerModule, MatIconModule, MainTemplateComponent]
})

export class EmployeeDetailsComponent implements OnInit {
  private _employeeList = new BehaviorSubject<Employee[]>([]);
  employeeList = this._employeeList.asObservable();
  employees: any[] = [];
  typeSelected: string;
  selectedEmployeeId: number | null = null; // for tracking if editing

  @ViewChild(MatSort) sort!: MatSort;

  isHandset!: Observable<boolean>;
  isTablet!: Observable<boolean>;
  isWeb!: Observable<boolean>;

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private appService: AppService,
    private sweetAlertService: SweetAlertService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
  ) {
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit(): void {

    // this.spinnerService.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinnerService.hide();
    // }, 1500);


    //fetched the employee data from resolver
    this.employees = this.route.snapshot.data['employeeData'];

    // this.empService.getEmployee().subscribe(data => {
    //   this.employees = data;
    // });

    this.isHandset = this.appService.isHandset$;
    this.isTablet = this.appService.isTablet$;
    this.isWeb = this.appService.isWeb$;
  }

  getEmployees() {
    this.spinnerService.show();
    this.empService.getEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        this.spinnerService.hide();
      },
      error: error => {
         this.spinnerService.hide();
        console.error('Error while getting employees', error);
      }
    })
  }

  delete(id: number) {
    
    this.sweetAlertService.confirmDelete(() => {
       this.spinnerService.show();
      this.empService.deleteEmployee(id).subscribe({
        next: () => {
          console.log(`Deleted employee with ID ${id}`);
          this.getEmployees();
           this.spinnerService.hide();
          this.sweetAlertService.showSuccess(`Deleted employee with ID ${id}`)
        },
        error: error => {
           this.spinnerService.hide();
          console.error('Error deleting employee:', error);
        }
      });
    })
  }

  update(emp: Employee) {
    this.router.navigate([`/employees/form/${emp.id}`]);
  }

  addEmployee() {
    this.router.navigate([`/employees/form/${0}`]);
  }

  sortData(sort: Sort) {
    const data = [...this.employees];
    if (!sort.active || sort.direction === '') {
      this.employees = data;
      return;
    }

    this.employees = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'location':
          return compare(a.location, b.location, isAsc);
        case 'department':
          return compare(a.department, b.department, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: string | number, b: string | number, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
