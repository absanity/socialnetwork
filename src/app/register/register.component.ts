import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WebsocketService} from "../_services/websocket.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: Object = {preferences: {}}

  constructor(private _auth: AuthService,
              private _router: Router,
              private websocketService: WebsocketService) {
  }//injection of the AuthService & Router component

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)//registerUserData is the data stored in mongodb
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res['token'])
          this.websocketService.sendEvent({ type: 'connect' });

          this._router.navigate(['/home'])//redirect the user to this route when the connexion is successfull
        },
        err => console.log(err)
      )
  }
}
