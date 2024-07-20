import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { SpacesComponent } from './pages/spaces/spaces.component';
import { MyreservationsComponent } from './pages/myreservations/myreservations.component';
import { AComponent } from './Cabin/a/a.component';
import { BComponent } from './Cabin/b/b.component';
import { MyresourcesComponent } from './pages/myresources/myresources.component';
import { AdminprofileComponent } from './Admin/adminprofile/adminprofile.component';
import { MyspacesComponent } from './pages/myspaces/myspaces.component';
import { UserlistComponent } from './Admin/userlist/userlist.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'signin',component:SigninComponent},
    {path:'signup',component:SignupComponent},
    {path:'myprofile',component:MyprofileComponent},
    {path:'reservations',component:ReservationsComponent},
    {path:'resources',component:ResourcesComponent},
    {path:'spaces',component:SpacesComponent},
    {path:'myreservations',component:MyreservationsComponent},
    {path:'cabina',component:AComponent},
    {path:'cabinb',component:BComponent},
    {path:'myresource',component:MyresourcesComponent},
    {path:'adminprofile',component:AdminprofileComponent},
    {path:'myspace',component:MyspacesComponent},
    {path:'userlist',component:UserlistComponent}
];
