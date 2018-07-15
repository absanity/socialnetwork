import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}

  constructor(private _auth: AuthService,
              private _router: Router) {
  }//injection of the AuthService & Router component

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)//registerUserData is the data stored in mongodb
      .subscribe(
        res => {
          console.log(res),
            localStorage.setItem('token', res['token'])
          this._router.navigate(['/special'])//redirect the user to this route when the connexion is successfull
        },
        err => console.log(err)
      )
  }
}
