import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../interfaces/user'; // typescript file used to check if the data is correct
import { HttpModule, Headers, Http } from '@angular/http';

@Injectable()
export class UserService {

  private _resetpassword: string = "http://192.168.160.133:3000/api/resetpassword"
  private httpOptions: Object;

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  public resetpassword(email){
    return this.http.post<any>(this._resetpassword, email)
  }

  saveUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users', user, this.httpOptions);
  }

  login(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/login', user, this.httpOptions);
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null ? true : false;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users');
  }

  getChatRoomsChat(chatRoom) {
    return this.http.get('http://localhost:3000/chatroom/' + chatRoom);
  }

}
