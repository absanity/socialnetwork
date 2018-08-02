import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {WebHttp} from "../classes/WebHttp";
import {Websocket} from "../classes/Websocket";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  _pseudo = ''
  _invitationsListUrl = ''
  _deleteRelationshipUrl = ''
  _cancelInvitationUrl = ''
  _acceptInvitationUrl = ''
  _suggestionUrl = ''
  invitations: Array<any> = []
  private suggestions: Array<any>;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    this._invitationsListUrl = Websocket.URL + '/api/invitations'
    this._deleteRelationshipUrl = Websocket.URL + '/api/delete-relationship'
    this._cancelInvitationUrl = Websocket.URL + '/api/cancel-invitation'
    this._acceptInvitationUrl = Websocket.URL + '/api/accept-invitation'
    this._suggestionUrl = Websocket.URL + '/api/suggestions'

  }

  ngOnInit() {
    this.loadinvitations();
    this.loadsuggestions();
  }

  private loadinvitations() {
    //console.log('loadinvitations...');
    this.http.get<HttpResponse<any>>(
      this._invitationsListUrl
    ).subscribe(res => {
      //console.log('loadinvitations res...');
      //console.log(res);
      this.invitations = Object.keys(res).map(function (key) {
        let pseudoPath = 'https://api.adorable.io/avatars/200/' + res[key].pseudo;
        let customPath = '';
        if(res[key].avatar.path == 'https://api.adorable.io/avatars/200/' + res[key].pseudo){
          res[key].customPath = pseudoPath
          //console.log(pseudoPath)
        }else{
          if(res[key].avatar.path == undefined){
            res[key].avatar.path = pseudoPath;
          }else{
            res[key].customPath = Websocket.URL + '/api/uploads/' + res[key].avatar.path
            //console.log(res[key].customPath)
          }
        }
        return res[key];
      });
    });
  }

  loadsuggestions(){
    this.http.get<HttpResponse<any>>(this._suggestionUrl).subscribe(
      res => {
        //console.log(res)
        this.suggestions = Object.keys(res).map(function(key) {
          let pseudoPath = 'https://api.adorable.io/avatars/200/' + res[key].pseudo;
          let customPath = '';
          if(res[key].avatar.path == pseudoPath){
            res[key].customPath = pseudoPath
          }else{
            if(res[key].avatar.path == undefined){
              res[key].customPath = pseudoPath
            }else{
              res[key].customPath = Websocket.URL + '/api/uploads/' + res[key].avatar.path
            }
          }
          //console.log(res[key])
          return res[key]
        })//end map function
      }
    )
  }

  selectMember(pseudo: String){
    //console.log('selectMember')
    this.router.navigate(['/profile'], {queryParams: {pseudo: pseudo}})
  }

  deleteRelationship(pseudo) {
    let o = { pseudo: pseudo }
    this.http.post<any>(this._deleteRelationshipUrl, o).subscribe(
      res => {
        //console.log('res.....');
        this.loadinvitations();
      }
    )
  }

  cancelInvitation(pseudo) {
    let o = { pseudo: pseudo }
    this.http.post<any>(this._cancelInvitationUrl, o).subscribe(
      res => {
        //console.log('res.....');
        this.loadinvitations();
      }
    )
  }

  acceptInvitation(pseudo) {
    let o = { pseudo: pseudo }
    this.http.post<any>(this._acceptInvitationUrl, o).subscribe(
      res => {
        //console.log('res.....');
        this.loadinvitations();
      }
    )
  }

}
