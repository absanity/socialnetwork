import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {VariableService} from "./variable.service";
import {Websocket} from "../classes/Websocket";

@Injectable()
export class AuthService {

  private _registerUrl = "" //call to the backend API to collect the URL from registration
  private _loginUrl = ""; // call to the backend API to collect the informations from login

  constructor(private http: HttpClient,
              private _router: Router,
              private _variable: VariableService) {
    this._registerUrl = this._variable.getMainUrl() + 'api/register'
    this._loginUrl = this._variable.getMainUrl() + 'api/login'

  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user) //registerUser method accept an object as parameter and return the response that the backend API sends when available
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user) //<any> to be able to return the observable without any error
  }

  loggedIn() {
    return !!localStorage.getItem('token')//the !! return a boolean value
  }

  logoutUser() {
    console.log('logout *****');
    Websocket.socket.emit('forceDisconnect');
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
