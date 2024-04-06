import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  username: any;
  password: any;
  errorMessage: string | undefined;

  constructor(private http: HttpClient,private router: Router) {}

  
  signin(): void {
    const formData = {
      username: this.username,
      password: this.password
    };
    console.log(formData)
    this.http.post('http://localhost:5000/signin', formData)
      .subscribe((response: any) => {
        // Handle response from Flask
        
        if (response.success) {
          // Redirect user to dashboard or another page
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log("Login Success")
          this.router.navigate(['/myprofile']);
         
        } else {
          // Display error message to the user
          console.log("Invalid user")
          this.errorMessage = "Invalid username or password";
         
        }
      });
  }
 
  
/*
  login(): void {
    this.authService.login(this.username, this.password).subscribe(response => {
      // Assuming the response contains user details upon successful login
      if (response && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/myprofile']);
      }
    });
  }*/
}
