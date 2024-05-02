import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spaces.component.html',
  styleUrl: './spaces.component.css'
})
export class SpacesComponent {
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
