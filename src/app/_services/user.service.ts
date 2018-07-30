import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import {Websocket} from "../classes/Websocket"; // typescript file used to check if the data is correct

@Injectable()
export class UserService {

  private _resetpassword: string = Websocket.URL + "/api/resetpassword";
  private _uploadUrl: string = Websocket.URL + "/api/upload";

  constructor(
    private _http: HttpClient
  ) { }

  public uploadFile(selectedFile: File) {
    const fd = new FormData();
    console.log('work')
    fd.append('image', selectedFile, selectedFile.name);
    return this._http.post<any>(this._uploadUrl, fd)
  }

  public resetpassword(email){
    return this._http.post<any>(this._resetpassword, email)
  }
}
