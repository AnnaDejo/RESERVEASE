import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myspaces',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './myspaces.component.html',
  styleUrl: './myspaces.component.css'
})
export class MyspacesComponent {
  cartItems: any[] = []; // Change type as per your data structure

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const username=JSON.parse(localStorage.getItem("user")||"")["username"];  

    const url = `http://localhost:5000/carts/${username}`;

    this.http.get<{cart:any[]}>(url).subscribe(
      response => 
        {
          console.log(response);
          console.log(response.cart.length);
          if (response && response.cart.length > 0) {
            // Assuming each item in the response is a cart item
            this.cartItems = response.cart; // Assign the response directly to cartItems
          } else {
            console.log('No cart items found in the response');
          }      
        }
    );
  }

  cancelReservation(item: any): void {
    const username = JSON.parse(localStorage.getItem("user") || "")["username"];
    const url = `http://localhost:5000/cancel/${item.name}`;

    this.http.post<any>(url, {"username":username}).subscribe(
      response => {
        // console.log('Reservation cancelled:', response);
        console.log(response);
        const message = `${item.name} ${response.message}`;
        this.snackBar.open(message, 'OK',
        {
          duration: 5000, // Duration in milliseconds
          horizontalPosition: 'center', // Position of the notification
          verticalPosition: 'top'
        })
        // Implement any further logic as needed, such as updating UI
        // For example, remove the cancelled item from the cartItems array
        this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
        // this.loadCartItems();
        
      }
    );
  }

}

