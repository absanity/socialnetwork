import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
        console.log(res)
            localStorage.setItem('token', res['token'])
            localStorage.setItem('pseudo', res['pseudo'])
          this._router.navigate(['/special'])//redirect the user to this route when the connexion is successfull
        },
        err => console.log('test2')
      )
  }

}
