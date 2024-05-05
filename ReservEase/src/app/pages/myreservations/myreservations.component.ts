import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-myreservations',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './myreservations.component.html',
  styleUrl: './myreservations.component.css'
})
export class MyreservationsComponent implements OnInit {
  cartItems: any[] = []; // Change type as per your data structure

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const username=JSON.parse(localStorage.getItem("user")||"")["username"];  

    const url = `http://localhost:5000/cart/${username}`;

    this.http.get<{cart:any[]}>(url).subscribe(
      response => 
        {
          console.log(response);
          console.log(response.cart.length);
          if (response && response.cart.length > 0) {
            // Assuming each item in the response is a cart item
            this.cartItems = response.cart; // Assign the response directly to cartItems
          } else {
            console.error('No cart items found in the response');
          }      
        }
    );
  }

  cancelReservation(item: any): void {
    const username = JSON.parse(localStorage.getItem("user") || "")["username"];
    const url = `http://localhost:5000/cancel/${item.name}`;

    this.http.post(url, {}).subscribe(
      response => {
        console.log('Reservation cancelled:', response);
        // Implement any further logic as needed, such as updating UI
        // For example, remove the cancelled item from the cartItems array
        this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
      }
    );
  }

}
