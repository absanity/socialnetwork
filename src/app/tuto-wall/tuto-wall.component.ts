import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";

@Component({
  selector: 'app-tuto-wall',
  templateUrl: './tuto-wall.component.html',
  styleUrls: ['./tuto-wall.component.css']
})
export class TutoWallComponent implements OnInit {

  wallPost: String = '';
  _wallUrl = '';
  messages: Array<any> = []

  constructor(private http: HttpClient, private variable: VariableService) {
    this._wallUrl = this.variable.getMainUrl() + 'api/wall'

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
