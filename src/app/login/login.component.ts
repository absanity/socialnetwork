import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as socketIo from 'socket.io-client';
import {WebsocketService} from "../_services/websocket.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}

  constructor(private _auth: AuthService,
              private _router: Router,
              private websocketService: WebsocketService) {
  }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res['token']);
          localStorage.setItem('pseudo', res['pseudo']);

          this.websocketService.sendEvent({ type: 'connect' });

          this._router.navigate(['/wall'])//redirect the user to this route when the connexion is successfull
        },
        err => console.log('test2')
      )
  }

}
