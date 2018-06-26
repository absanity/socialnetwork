import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  private _registerUrl = "http://192.168.160.133:3000/api/register" //call to the backend API to collect the URL from registration
  private _loginUrl = "http://192.168.160.133:3000/api/login"; // call to the backend API to collect the informations from login

  constructor(private http: HttpClient,
              private _router: Router) {
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
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
