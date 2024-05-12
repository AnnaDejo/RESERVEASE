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
export class MyreservationsComponent  {
  
}
