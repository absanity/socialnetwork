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
  ok: boolean

  constructor(private _auth: AuthService,
              private _router: Router,
              private websocketService: WebsocketService) {
  }//injection of the AuthService & Router component

  ngOnInit() {
  }

  testmail(mail){
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      this.ok = emailRegex.test(mail);
  }

  registerUser() {

    if(this.ok == true){
      this._auth.registerUser(this.registerUserData)//registerUserData is the data stored in mongodb
          .subscribe(
            res => {
              //console.log(res);
              localStorage.setItem('token', res['token']);
              localStorage.setItem('pseudo', res['pseudo']);

              this.websocketService.sendEvent({ type: 'connect' });

              this._router.navigate(['/wall'])//redirect the user to this route when the connexion is successfull
            },
            err => console.log(err)
          )
    }else{
      console.log("pas ok")
    }
  }
}
