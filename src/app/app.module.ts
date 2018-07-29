import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

///// COMPONENTS /////
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProfilComponent} from './profil/profil.component';
import {MembresComponent} from './membres/membres.component';
import {InvitationsComponent} from './invitations/invitations.component';
import {MessagesComponent} from './messages/messages.component';
import {DialogComponent} from './dialog/dialog.component';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EventsComponent} from './events/events.component';
import {SpecialEventsComponent} from './special-events/special-events.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';

///// SERVICES /////
import {UserService} from './_services/user.service';
import {AuthService} from './_services/auth.service';
import {EventService} from './_services/event.service';
import {TokenInterceptorService} from './_services/token-interceptor.service';
import {AuthGuard} from './auth.guard';


import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatAutocompleteModule,
} from '@angular/material';
import {SendComponent} from './send/send.component';


import {VariableService} from "./_services/variable.service";
import {WallComponent} from './wall/wall.component';
import {ProfileComponent} from './profile/profile.component';
import {MembersComponent} from './members/members.component';
import {ProfileWallComponent} from './profile-wall/profile-wall.component';
import {ProfileInfosComponent} from './profile-infos/profile-infos.component';
import {ProfileFriendsComponent} from './profile-friends/profile-friends.component';
import {ConversationComponent} from './conversation/conversation.component';
import {WebsocketService} from "./_services/websocket.service";
//import { InvalidmessageDirective } from './invalidmessage.directive';
//import { InvalidtypeDirective } from './invalidtype.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SendComponent,
    ResetpasswordComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfilComponent,
    MembresComponent,
    InvitationsComponent,
    MessagesComponent,
    DialogComponent,

    WallComponent,
    ProfileComponent,
    MembersComponent,
    ProfileWallComponent,
    ProfileInfosComponent,
    ProfileFriendsComponent,
    ConversationComponent,
    //  InvalidmessageDirective,
    //  InvalidtypeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatIconModule,
  ],

  providers: [
    AuthService,
    AuthGuard,
    EventService,
    VariableService,
    UserService,
    WebsocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ],
})
export class AppModule {
}
