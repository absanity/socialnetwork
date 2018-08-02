import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Websocket} from "../classes/Websocket";

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

  _pseudo = ''
  _friendsListUrl = ''
  friends: Array<any> = []


  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this._friendsListUrl = Websocket.URL + '/api/friends'

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
        //console.log(res[key])
        //console.log(pseudo)
        //console.log(res[key].userSource.pseudo)
        //console.log(res[key].userTarget.pseudo)
        if(res[key].userSource.pseudo == pseudo || pseudo == ''){
          //console.log('source')
          o = {pseudo: res[key].userTarget.pseudo, email: res[key].userTarget.email, avatar: res[key].userTarget.avatar}
          //console.log(o +  ' target')
        }else{
          //console.log(res[key].userSource.pseudo)
          //console.log('target')
          o = {pseudo: res[key].userSource.pseudo, email: res[key].userSource.email, avatar: res[key].userSource.avatar}
          //console.log(o + ' source')
        }
        res[key].finalUser = o;
        //console.log(o)

        let pseudoPath = 'https://api.adorable.io/avatars/200/' + o.avatar.path;
        let customPath = '';
        if(o.avatar.path == 'https://api.adorable.io/avatars/200/' + o.pseudo){
          o.customPath = pseudoPath
        }else{
          if(o.avatar.path == undefined){
            o.avatar.path = pseudoPath
          }else{
            o.customPath = Websocket.URL + '/api/uploads/'+ o.avatar.path
          }
        }
        //console.log(o)
        //console.log(res[key])
        return res[key];
      });
    });
  }
}
