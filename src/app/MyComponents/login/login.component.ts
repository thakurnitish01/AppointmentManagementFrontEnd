import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router : Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  postData() {
    const email = this.loginForm.value.UserName;
    const password = this.loginForm.value.Password;
    this.authService.loginUser(email, password).subscribe(
      (response) => {
        console.log('Successful login', response);
        Swal.fire("Success","Successful login", "success");
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/list'])
      },
      (error) => {
        console.error('Error logging in', error);
        Swal.fire("Error","Somthing went wrong....!", "error");
      }
    );
  }
}