import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {DialogComponent} from './dialog/dialog.component';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {TutoWallComponent} from './tuto-wall/tuto-wall.component';
import {LoginComponent} from './login/login.component';
import {EventsComponent} from './events/events.component';
import {SpecialEventsComponent} from './special-events/special-events.component';
import {AuthService} from './_services/auth.service';
import {EventService} from './_services/event.service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './_services/token-interceptor.service';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProfilComponent} from './profil/profil.component';
import {MembresComponent} from './membres/membres.component';
import {InvitationsComponent} from './invitations/invitations.component';
import {MessagesComponent} from './messages/messages.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

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
import {VariableService} from "./_services/variable.service";
import { TutoWallListComponent } from './tuto-wall-list/tuto-wall-list.component';
//import { InvalidmessageDirective } from './invalidmessage.directive';
//import { InvalidtypeDirective } from './invalidtype.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TutoWallComponent,
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
    TutoWallListComponent,
    //  InvalidmessageDirective,
    //  InvalidtypeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, EventService, VariableService, {
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
