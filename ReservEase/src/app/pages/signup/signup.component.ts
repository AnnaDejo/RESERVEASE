import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fname: string | undefined; lname: string | undefined; eid: string | undefined; username: string | undefined; password: string | undefined; confirm: string | undefined;
  designation: string | undefined; state: string | undefined; region: string | undefined; phone: string | undefined;
  mail: string | undefined; myreservation = {}
  message: string | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    const userData = {
      lname: this.lname, fname: this.fname, eid: this.eid, designation: this.designation, state: this.state, region: this.region,
      username: this.username, phone: this.phone, mail: this.mail, password: this.password, confirm: this.confirm, myreservation: this.myreservation
    };

    this.http.post('http://localhost:5000/signup', userData).subscribe((response: any) => {
      // Handle response from Flask

      if (response.message) {
        // Redirect user to dashboard or another page
        console.log("Registration Success")
        this.router.navigate(['/signin']);

      }
      if(response.alert6)
        this.message="Fill all the fields"
      else if (response.alert1)
        this.message = "Not a Registered Employee"
      else if (response.alert2)
        this.message = "Username already Exists"
      else if (response.alert3)
        this.message = "Passwords do not match"
      else if (response.alert4)
        this.message = "Not a valid Phone number"
      else if (response.alert5)
        this.message = "Not a valid Email id"
    });

  }
}
