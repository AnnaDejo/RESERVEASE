import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-b',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './b.component.html',
  styleUrl: './b.component.css'
})
export class BComponent {
  private baseUrl = 'http://localhost:5000';

  constructor(public http: HttpClient,private snackBar: MatSnackBar) { }

 
  addToMyReservations(name:string){
    const username=JSON.parse(localStorage.getItem("user")||"")["username"];
    console.log(username)
    this.http.get<any>(this.baseUrl+`/cabinb/${name}/${username}`).subscribe(res => 
      {
        
        console.log(res);
        const message = `${name} ${res.result}`;
        this.snackBar.open(message, 'OK',
        {
          duration: 5000, // Duration in milliseconds
          horizontalPosition: 'center', // Position of the notification
          verticalPosition: 'top'
        })
      });
    
  }

}
