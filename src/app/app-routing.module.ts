import {MessagesComponent} from './messages/messages.component';
import {SendComponent} from './send/send.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EventsComponent} from './events/events.component';
import {SpecialEventsComponent} from './special-events/special-events.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {InvitationsComponent} from "./invitations/invitations.component";
import {WallComponent} from "./wall/wall.component";
import {ProfileComponent} from "./profile/profile.component";
import {MembersComponent} from "./members/members.component";

const routes: Routes = [
  {
    path: 'home',
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
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'send',
    component: SendComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invitations',
    component: InvitationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wall',
    component: WallComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
export class AppRoutingModule {
}
