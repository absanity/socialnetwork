import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Websocket} from "../classes/Websocket";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  wallPost: String = '';
  _wallUrl = '';
  messages: Array<any> = []

  constructor(private http: HttpClient) {
    this._wallUrl = Websocket.URL + '/api/wall'

  }

  ngOnInit() {
    this.loadMessages();

  }

  save() {
    console.log('save...');
    console.log(this.wallPost);
    let o = { message: this.wallPost }
    this.http.post<any>(this._wallUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.wallPost = '';
        this.loadMessages();
      }
    )
  }

  loadMessages() {
    this.http.get<HttpResponse<any>>(
      this._wallUrl
    ).subscribe(data => {

      console.log('res...');
      console.log(data);
      this.messages = Object.keys(data).map(function (key) {
        let pseudoPath = 'https://api.adorable.io/avatars/200/' + data[key].userSource.pseudo;
        let customPath = '';
        if(data[key].userSource.avatar.path == pseudoPath){
          //console.log(data[key].userSource.avatar.path + ' api')
          data[key].userSource.customPath = pseudoPath
          //console.log(pseudoPath)
        }else{
          if(data[key].userSource.avatar.path == undefined){
            data[key].userSource.avatar.path = pseudoPath;
          }else{
            //console.log(data[key].userSource.avatar.path + ' custom')
            data[key].userSource.customPath = Websocket.URL + '/api/uploads/' + data[key].userSource.avatar.path
          }
        //console.log(data[key])
      }
        return data[key];
      });


    });
  }

}
