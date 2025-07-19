import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../app/common/sweet-alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginRequest = {
    email: '',
    password: ''
  }

  constructor(private router: Router, 
    private httpClient: HttpClient,
    private sweetAlertService: SweetAlertService) { }

  onLogin() {
    this.httpClient.post("http://localhost:8081/auth/login", this.loginRequest).subscribe((data: any) => {
      if (data.token) {
        const token = data.token;
        localStorage.setItem("AuthToken", token)
        localStorage.setItem("user", data.name)
        this.sweetAlertService.showSuccess(`logged in successfully`)
        this.router.navigate(['/employees']);
      }
      else {
        alert("Wrong credentials, Try again");
      }
    })
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
