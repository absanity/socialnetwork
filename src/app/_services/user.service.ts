import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user'; // typescript file used to check if the data is correct

@Injectable()
export class UserService {

  private _resetpassword: string = "http://192.168.160.133:3000/api/resetpassword"

  constructor(
    private _http: HttpClient
  ) { }

  public resetpassword(email){
    return this._http.post<any>(this._resetpassword, email)
  }
}
