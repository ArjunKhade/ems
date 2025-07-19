import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { SweetAlertService } from '../../app/common/sweet-alert.service';
import { LoaderService } from '../../components/spinner/loader.service';
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, SpinnerComponent,
    MatSelectModule, MatNativeDateModule, MatCardModule, MatAutocompleteModule,
    ReactiveFormsModule, FormsModule, MatButtonModule, MatDialogModule, SpinnerComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {

  registrationForm!: FormGroup;
  empId: number = 0;
  name: string = '';
  location: string = '';
  department: string = '';

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit(): void {


    this.empId = Number(this.route.snapshot.paramMap.get("id"));
    this.createForm();
    if (this.HasId) {
      this.getEmployeeById(this.empId);
      this.registrationForm.addControl('id', new FormControl({ value: `Employee Id: ${this.empId}`, disabled: true }, [Validators.required]))
    }

  }

  get HasId() {
    return this.empId > 0;
  }

  createForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl(this.name),
      location: new FormControl(this.location),
      department: new FormControl(this.department),
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.loaderService.show();
      //edit case
      if (this.HasId) {
        this.empService.updateEmployee(this.registrationForm.value, this.empId).subscribe({

          next: response => {
            console.log('Employee updated successfully', response);
            this.sweetAlertService.showSuccess('Employee updated successfully!');
            this.registrationForm.reset();
            this.router.navigate(['/employees']);
            this.loaderService.hide();
          },
          error: e => {
            console.error('Error while updating employee', e);
            this.loaderService.hide();
          }
        })
      } else {
        // add case
        this.loaderService.show();
        this.empService.addEmployee(this.registrationForm.value).subscribe({

          next: response => {
            console.log('Employee added successfully', response);
            this.sweetAlertService.showSuccess('Employee added successfully');
            this.registrationForm.reset();
            this.router.navigate(['/employees']);
            this.loaderService.hide();
          },
          error: error => {
            console.error('Error adding employee', error);
            this.loaderService.hide();
          }

        })

      }

    }
  }


  getEmployeeById(empId: number) {
    this.loaderService.show();

    this.empService.getEmployeeById(empId).subscribe({

      next: (response) => {
        console.log(response);

        // Efficiently update form values without re-creating the form
        this.registrationForm.patchValue({
          name: response.name,
          location: response.location,
          department: response.department
        });
        this.loaderService.hide();

      },

      error: (e) => {
        console.error('Error fetching employee by ID:', e);
        this.loaderService.hide();
      }
    })

  }


}
