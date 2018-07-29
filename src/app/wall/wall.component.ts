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
        return data[key];
      });


    });
  }

}
