import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FootComponent } from './units/foot/foot.component';
import { NavComponent } from './units/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,SigninComponent,SignupComponent,NavComponent,HttpClientModule,MyprofileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReservEase';
}
