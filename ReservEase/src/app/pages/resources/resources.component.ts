import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit {
  products: any[] | undefined;
  status:any;
  private baseUrl = 'http://localhost:5000';

  constructor(public http: HttpClient,private snackBar: MatSnackBar) { }

  getProducts(endPoint:String): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+endPoint);
  }
  addToMyReservations(name:string){
    const username=JSON.parse(localStorage.getItem("user")||"")["username"];
    console.log(username)
    this.http.get<any>(this.baseUrl+`/resources/${name}/${username}`).subscribe(res => 
      {
        this.status=res;
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


  ngOnInit(): void {
   this.getProducts("/product").subscribe(response => {this.products=response})
   console.log(this.products)
   
   
  }

}
