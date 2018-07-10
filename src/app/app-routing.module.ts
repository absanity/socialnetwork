import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessagesComponent } from './messages/messages.component';
import {TutoWallComponent} from "./tuto-wall/tuto-wall.component";

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    component: SpecialEventsComponent,
    canActivate: [AuthGuard]//executed when a user tried to navigate to this route. If not registered or logged, the route can't be seen
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tuto-wall',
    component: TutoWallComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
