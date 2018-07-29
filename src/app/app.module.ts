import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

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
import {PushNotifService} from './_services/push-notif.service';
import {SearchService} from './_services/search.service';


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

} from '@angular/material';
import { SendComponent } from './send/send.component';



import {VariableService} from "./_services/variable.service";
import { WallComponent } from './wall/wall.component';
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import { ProfileWallComponent } from './profile-wall/profile-wall.component';
import { ProfileInfosComponent } from './profile-infos/profile-infos.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { NotifPushComponent } from './notif-push/notif-push.component';
import { AdminComponent } from './admin/admin.component';
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
    NotifPushComponent,
    AdminComponent,
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGridListModule,
    HttpModule,
    MatAutocompleteModule
  ],

  providers: [AuthService, AuthGuard, EventService, VariableService, UserService, PushNotifService, SearchService, {
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
