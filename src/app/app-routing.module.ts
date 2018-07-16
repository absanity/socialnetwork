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
import {TutoWallComponent} from "./tuto-wall/tuto-wall.component";
import {TutoWallListComponent} from './tuto-wall-list/tuto-wall-list.component';
import {TutoProfileComponent} from "./tuto-profile/tuto-profile.component";
import {TutoMembersComponent} from "./tuto-members/tuto-members.component";
import {TutoInvitationsComponent} from "./tuto-invitations/tuto-invitations.component";
import {SendComponent} from './send/send.component';

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
    path: 'tuto-wall',
    component: TutoWallComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tuto-wall-list',
    component: TutoWallListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tuto-profile',
    component: TutoProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tuto-members',
    component: TutoMembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tuto-invitations',
    component: TutoInvitationsComponent,
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
