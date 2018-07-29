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
        //console.log(data[key].userSource.pseudo)
        //console.log(key)
        //console.log(data[key])
        //console.log('**')
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
            data[key].userSource.customPath = 'http://192.168.160.133:4200/assets/uploads/' + data[key].userSource.avatar.path
          }
        //console.log(data[key])
      }
      return data[key];
    });//end map
  });//end subscribe
  }//end loadMessages

}
