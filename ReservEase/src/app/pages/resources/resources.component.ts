import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(public http: HttpClient) { }

  getProducts(endPoint:String): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+endPoint);
  }
  addToMyReservations(name:string){
    const username=JSON.parse(localStorage.getItem("user")||"")["username"];
    console.log(username)
    this.http.get<any[]>(this.baseUrl+`/myreservation/${name}/${username}`).subscribe(res => {this.status=res;console.log(res)});
    
    
  }


  ngOnInit(): void {
   this.getProducts("/product").subscribe(response => {this.products=response})
   console.log(this.products)
   
   
  }

}
