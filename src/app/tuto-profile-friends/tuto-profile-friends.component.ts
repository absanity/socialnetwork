import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {VariableService} from "../_services/variable.service";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-tuto-profile-friends',
  templateUrl: './tuto-profile-friends.component.html',
  styleUrls: ['./tuto-profile-friends.component.css']
})
export class TutoProfileFriendsComponent implements OnInit {

  _pseudo = ''
  _friendsListUrl = ''
  friends: Array<any> = []

  constructor(private http: HttpClient, private variable: VariableService, private activatedRoute: ActivatedRoute) {
    this._friendsListUrl = this.variable.getMainUrl() + 'api/friends'

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._pseudo = params['pseudo'] != undefined ? params['pseudo'] : '';
      this.loadFriends(this._pseudo);
    });
  }

  private loadFriends(pseudo) {
    this.http.get<HttpResponse<any>>(
      this._friendsListUrl + (pseudo != '' ? '?pseudo=' + pseudo : '')
    ).subscribe(res => {
      this.friends = Object.keys(res).map(function (key) {
        return res[key];
      });
    });
  }
}
