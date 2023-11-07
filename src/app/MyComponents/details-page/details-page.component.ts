import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  appointment: any; 

  constructor(private route: ActivatedRoute, 
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.getAppointmentDetails(id);
    });
  }

  getAppointmentDetails(Id: number) {
    this.authService.getAppointmentById(Id).subscribe(
      (resp) => {
        this.appointment = resp;
        console.log("getting the appointment details", this.appointment);
      },
      (error) => {
        console.log("got error", error);
      }
    );
  }

   cancelAppointment() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.cancelAppointment(this.appointment).subscribe(
          () => {
            Swal.fire(
              'Cancelled!',
              'Your appointment has been canceled.',
              'success'
            );
            console.log('Appointment canceled successfully');
          },
          (error) => {
            Swal.fire(
              'Error!',
              'An error occurred while canceling the appointment.',
              'error'
            );
            console.error('Error while canceling appointment', error);
          }
        );
      }
    })
  }
  
  onEdit(Id: number){
    this.router.navigate(['/edit', Id]);
  }
}
