import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {VariableService} from "../_services/variable.service";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

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
        let o;
        //console.log(res[key].userSource.pseudo)
        //console.log(pseudo)
        if(res[key].userSource.pseudo == pseudo || pseudo == ''){

          o = {pseudo: res[key].userTarget.pseudo, email: res[key].userTarget.email}
        }else{
          //console.log(res[key].userSource.pseudo)
          o = {pseudo: res[key].userSource.pseudo, email: res[key].userSource.email}
        }
        res[key].finalUser = o;
        console.log(res[key])
        return res[key];
      });
    });
  }
}
