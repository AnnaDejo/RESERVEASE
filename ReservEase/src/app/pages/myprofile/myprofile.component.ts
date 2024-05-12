import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')||"");
  }
  signout(): void {
    // Make an HTTP request to the server's signout endpoint
    this.http.post('http://localhost:5000/signout', null).subscribe((res:any) => {
      // Redirect to the home page after signout
      if(res.out){
        console.log("Signed Out")
        localStorage.removeItem('user');
        this.router.navigate(['']);
      }
      else
      {
        console.log("Error in signing out")
      }
    });
  }

}
