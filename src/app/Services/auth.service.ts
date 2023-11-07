import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, pipe, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://localhost:7066"
  // baseUrl = "https://appointment-managemnet-backend.vercel.app"
  constructor(private http : HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  }

  loginUser(email: string, password: string): Observable<any> {
    const data = { UserName: email, Password: password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/api/login`, data, httpOptions).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  SignUp(data : any) : Observable<any>
  {
    const mainURl = `${this.baseUrl}/api/login/signup`
    return this.http.post<any>(mainURl, data)
    .pipe(
      catchError(this.handleError)
    );
  }

 deleteAppointment(Id: number): Observable<number> {
    const mainURL = `${this.baseUrl}/api/form/${Id}`;
    return this.http.delete<any>(mainURL, this.httpOptions).pipe(
        map(() => Id) 
    );
}


  public async getData(): Promise<any> {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        return await this.http.get<any>(`${this.baseUrl}/api/form`, this.httpOptions).toPromise();
      } else {
        console.log("Token is not available.");
        return null;
      }
    } catch (error : any) {
      return this.handleError(error);
    }
  }

  postData(data: any) : Observable<any>{
    const token = localStorage.getItem('token');
    if (token) {
    return this.http.post(`${this.baseUrl}/api/form`,data, this.httpOptions);
    }else{
      console.log("Token is not available.");
      return of(null);
    }
  }
  
  getAppointmentById(Id: number | any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/form/${Id}`, this.httpOptions);
}

  update(data: any) {
    return this.http.put(`${this.baseUrl}/api/form/${data.Id}`, data, this.httpOptions);
  }
  cancelAppointment(appointment: any): Observable<any> {
    appointment.status = true; 
    return this.update(appointment);
  }



// error handlling method

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      Swal.fire({
        title: 'Error',
        text: `Error Code: ${error.status}\nMessage: ${error.error}`,
        icon: 'error'
      });
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
