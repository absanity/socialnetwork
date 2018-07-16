import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-profile-wall',
  templateUrl: './profile-wall.component.html',
  styleUrls: ['./profile-wall.component.css']
})
export class ProfileWallComponent implements OnInit {

  wallPost: String = '';
  _pseudo = ''
  _wallUrl = ''
  messages: Array<any> = []

  constructor(private http: HttpClient, private variable: VariableService, private activatedRoute: ActivatedRoute) {
    this._wallUrl = this.variable.getMainUrl() + 'api/profile-wall'

  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._pseudo = params['pseudo'] != undefined ? params['pseudo'] : '';
      this.loadMessages(this._pseudo);
    });

  }

  save() {
    let o = { message: this.wallPost, pseudo: this._pseudo }
    this.http.post<any>(this._wallUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.wallPost = '';
        this.loadMessages(this._pseudo);
      }
    )
  }

  loadMessages(pseudo) {
    this.http.get<HttpResponse<any>>(
      this._wallUrl + (pseudo != '' ? '?pseudo=' + pseudo : '')
    ).subscribe(data => {
      this.messages = Object.keys(data).map(function (key) {
        return data[key];
      });


    });
  }
}
