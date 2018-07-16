import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";

@Component({
  selector: 'app-tuto-wall-list',
  templateUrl: './tuto-wall-list.component.html',
  styleUrls: ['./tuto-wall-list.component.css']
})
export class TutoWallListComponent implements OnInit {

  _wallUrl = ''
  messages: Array<any> = []

  constructor(private http: HttpClient, private variable: VariableService) {
    this._wallUrl = this.variable.getMainUrl() + 'api/wall'

  }

  ngOnInit() {
    this.loadMessages();
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
