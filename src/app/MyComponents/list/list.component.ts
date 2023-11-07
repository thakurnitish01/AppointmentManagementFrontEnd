import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appointments : any ;
  currentUser : any;
  cancelAppointment : boolean = false
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.getDetails();    
  }



  getDetails(){ 
    this.authService.getData().then(
      (resp)=>{
      this.appointments = resp;
      console.log("getting the data ", this.appointments);
    })
  .catch((error)=>{
    console.log("got error", error);
    Swal.fire("Oops","Unauthorized", "error");
  })
  }

  DeleteAppointment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteAppointment(id).subscribe(
          (resp) => {
            Swal.fire('Deleted!', 'The appointment has been deleted.', 'success');
            console.log('The appointment has been deleted...!');
            // Remove the deleted item from the view
            this.appointments = this.appointments.filter((appointment : any) => appointment.Id !== id);
          },
          (error) => {
            Swal.fire('Error!', 'Got some error...!', 'error');
            console.log('Got some error...!', error);
          }
        );
      }
    });
  }
  
 

  openDetails(id: number) {
    this.router.navigate(['/details', id]); 
   }
}
