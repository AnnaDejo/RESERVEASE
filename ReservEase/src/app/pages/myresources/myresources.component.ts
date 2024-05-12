import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myresources',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './myresources.component.html',
  styleUrl: './myresources.component.css'
})
export class MyresourcesComponent {
  cartItems: any[] = []; // Change type as per your data structure
  cartValue: { [key: string]: any } = {};
  constructor(private http: HttpClient ,private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const username=JSON.parse(localStorage.getItem("user")||"")["username"];  

    const url = `http://localhost:5000/cartr/${username}`;

    this.http.get<{cart:any[],myreservations:{}}>(url).subscribe(
      response => 
        {
          console.log(response);
          console.log(response.cart.length);
          console.log(response.myreservations);
          if (response && response.cart.length > 0) {
            // Assuming each item in the response is a cart item
            this.cartItems = response.cart;
            this.cartValue=response.myreservations;
            console.log(this.cartItems) // Assign the response directly to cartItems
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
        if (this.cartValue!=undefined && this.cartValue[item.name] && this.cartValue[item.name]>0)
          this.cartValue[item.name]--;
        // Implement any further logic as needed, such as updating UI
        // For example, remove the cancelled item from the cartItems array
        // this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
        // this.loadCartItems();
        if(this.cartValue[item.name]==0)
          location.reload()
        
      }
    );
  }
}
