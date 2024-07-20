import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  imports:[CommonModule,RouterLink],
  standalone:true
})
export class UserlistComponent implements OnInit {
  users: any[] = [];
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<any[]>(`${this.baseUrl}/users`).subscribe(
      (users) => {
        this.users = users;
      },
      
    );
  }

  expandedUserId: number | null = null; // Initialize expanded user ID to null

  toggleAccordion(userId: number): void {
    this.expandedUserId = (this.expandedUserId === userId) ? null : userId;
  }
}
