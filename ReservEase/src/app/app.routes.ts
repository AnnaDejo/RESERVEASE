import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { SpacesComponent } from './pages/spaces/spaces.component';
import { MyreservationsComponent } from './pages/myreservations/myreservations.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'signin',component:SigninComponent},
    {path:'signup',component:SignupComponent},
    {path:'myprofile',component:MyprofileComponent},
    {path:'reservations',component:ReservationsComponent},
    {path:'resources',component:ResourcesComponent},
    {path:'spaces',component:SpacesComponent},
    {path:'myreservations',component:MyreservationsComponent}
    //{path:'cabina',component:SpacesComponent}


];
