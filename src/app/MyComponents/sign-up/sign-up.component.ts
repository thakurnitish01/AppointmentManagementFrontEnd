import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm !: FormGroup
  constructor(private _formBuilder : FormBuilder,
              private _router : Router,
              private _authservice : AuthService)
               { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      FullName : ['', Validators.required],
      UserName : ['', [Validators.required,Validators.email]],
      Password : ['', Validators.required]
    })
  }


  CreateUserAccount(){
    if(this.signUpForm.valid)
    {
      const newUser = this.signUpForm.value;
      console.log(newUser);
      if(newUser){
        this._authservice.SignUp(newUser).subscribe(
          (resp)=>{
            console.log("Account has been created",resp);
            Swal.fire("Success","Account has been Created", "success");
            this._router.navigate([''])
          },(error)=>{
            console.log("error during the account creation...",error)
            Swal.fire("Error", "Somthing Went Wrong", "error");
          }
        )
      }
    }
  }
}
