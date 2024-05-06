import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './a.component.html',
  styleUrl: './a.component.css'
})
export class AComponent {

}
