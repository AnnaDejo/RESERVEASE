import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminprofile',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './adminprofile.component.html',
  styleUrl: './adminprofile.component.css'
})
export class AdminprofileComponent implements OnInit {
  admin: any;

  constructor() { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('admin')||"");
  }
}
