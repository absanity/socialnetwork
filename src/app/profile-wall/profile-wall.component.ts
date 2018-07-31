import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {WebHttp} from "../classes/WebHttp";
import {Websocket} from "../classes/Websocket";

@Component({
  selector: 'app-profile-wall',
  templateUrl: './profile-wall.component.html',
  styleUrls: ['./profile-wall.component.css']
})
export class ProfileWallComponent implements OnInit {

  wallPost: String = '';
  _pseudo = ''
  _wallUrl = ''
  _wallDelete = ''
  messages: Array<any> = []
  private myProfil: boolean = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this._wallUrl = Websocket.URL + '/api/profile-wall'
    this._wallDelete = Websocket.URL + '/api/delete-message'

  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._pseudo = params['pseudo'] != undefined ? params['pseudo'] : '';
      this.loadMessages(this._pseudo);
      console.log(this._pseudo)
      if(this._pseudo == ""){
        this.myProfil = true;
      }
    });

  }

  save() {
    let o = { message: this.wallPost, pseudo: this._pseudo }
    this.http.post<any>(this._wallUrl, o).subscribe(
      res => {
        //console.log(o);
        this.wallPost = '';
        this.loadMessages(this._pseudo);
      }
    )
  }

  loadMessages(pseudo) {
    this.http.get<HttpResponse<any>>(
      this._wallUrl + (pseudo != '' ? '?pseudo=' + pseudo : '')
    ).subscribe(data => {
     console.log(data)
      this.messages = Object.keys(data).map(function (key) {
        let prof;
        let pseudoPath = 'https://api.adorable.io/avatars/200/' + data[key].userSource.pseudo;
        let customPath = '';
        if(data[key].userSource.avatar.path == pseudoPath){
          data[key].userSource.customPath = pseudoPath
        }else{
          if(data[key].userSource.avatar.path == undefined){
            data[key].userSource.avatar.path = pseudoPath;
          }else{
            data[key].userSource.customPath = Websocket.URL + '/uploads/' + data[key].userSource.avatar.path
          }
      }
      return data[key];
    });//end map
  });//end subscribe
  }//end loadMessages

  deleteMessage(res){
    console.log(res)
    let msgd = {res}
    this.http.post<any>(this._wallDelete, msgd).subscribe(
      res => {
        this.loadMessages(this._pseudo)
      }
    )
  }

}
