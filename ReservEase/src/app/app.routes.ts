import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ResourcesComponent } from './pages/resources/resources.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'signin',component:SigninComponent},
    {path:'signup',component:SignupComponent},
    {path:'myprofile/:username',component:MyprofileComponent},
    {path:'reservations',component:ReservationsComponent},
    {path:'resources',component:ResourcesComponent}

];
