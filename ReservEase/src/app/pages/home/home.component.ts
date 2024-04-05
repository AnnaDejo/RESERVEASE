import { Component } from '@angular/core';
import { NavComponent } from '../../units/nav/nav.component';
import { FootComponent } from '../../units/foot/foot.component';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,FootComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data:string="";
  constructor(private http: HttpClient) {}

  fetchData(): void {
    this.http.get<any>('http://localhost:5000/').subscribe(response => {
      console.log(response.body);
      this.data=response.body;
      // Handle response data here
    });
  }

}
