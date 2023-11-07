import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      Id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      selectDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.getDataById(id);
      }
    });
  
  }

  handleSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      if (formData.Id) {
        this.UpdateDetails(formData);
      } else {
        this.CreateProject();
      }
    } else {
      console.error("Form is invalid. Please fill in all required fields.");
    }
  }

  CreateProject() {
    const {Id , ...formValues} = this.myForm.value;
    console.log(formValues);
    this.authService.postData(formValues).subscribe(
      (resp : any) => {
        console.log("Data posted successfully,", resp);
        Swal.fire("Success","SucessFully Added..!","success");
        this.myForm.reset();
      },
      (error) => {
        console.error("Error", error);
        Swal.fire("Error","Somthing Went Wrong","error")
      }
    );
  }

  UpdateDetails(data: any) {
    this.authService.update(data).subscribe(
      (resp) => {
        if (resp) {
          Swal.fire("Success",`Successfully Updated ${resp}`,"success",);
          this.router.navigate(['/list']);
          this.myForm.reset();
        } else {
          Swal.fire("Error","Something went wrong","error");
        }
      },
      (error) => {
        console.error("Got an error", error);
      }
    );
  }
  getDataById(id: number): void {
    this.authService.getAppointmentById(id).subscribe(
      (data) => {
        if (data) {
          if (this.myForm) {
            this.myForm.patchValue(data);
          } else {
            console.error('myForm is undefined. Cannot patch value.');
          }
        } else {
          console.error('Data is undefined. Unable to patch value.');
        }
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
  
    
}
