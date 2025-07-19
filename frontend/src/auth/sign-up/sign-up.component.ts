import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;

  // employee = {
  //   name: '',
  //   email: '',
  //   // department: '',
  //   password: '',
  //   confirmPassword: ''
  // };

  constructor(private router: Router, private httpClient: HttpClient, private fb: FormBuilder,) { }


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], 
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] 
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): null | object {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }


  onSubmit() {
    // console.log(this.employee);
    this.httpClient.post("http://localhost:8081/auth/signup", this.signupForm.value).subscribe((data: any) => {
      alert("Registered successfully")
    }, error => {
      console.log(error);
    })
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
