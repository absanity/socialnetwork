import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";
import {ActivatedRoute, Params} from "@angular/router";

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
  invitations: Array<any> = []

  constructor(private http: HttpClient, private variable: VariableService, private activatedRoute: ActivatedRoute) {
    this._invitationsListUrl = this.variable.getMainUrl() + 'api/invitations'
    this._deleteRelationshipUrl = this.variable.getMainUrl() + 'api/delete-relationship'
    this._cancelInvitationUrl = this.variable.getMainUrl() + 'api/cancel-invitation'
    this._acceptInvitationUrl = this.variable.getMainUrl() + 'api/accept-invitation'
  }

  ngOnInit() {
    this.loadinvitations();
  }

  private loadinvitations() {
    console.log('loadinvitations...');
    this.http.get<HttpResponse<any>>(
      this._invitationsListUrl
    ).subscribe(res => {
      console.log('loadinvitations res...');
      console.log(res);
      this.invitations = Object.keys(res).map(function (key) {
        let pseudoPath = 'https://api.adorable.io/avatars/200/' + res[key].pseudo;
        let customPath = '';
        if(res[key].avatar.path == 'https://api.adorable.io/avatars/200/' + res[key].pseudo){
          res[key].customPath = pseudoPath
          console.log(pseudoPath)
        }else{
          if(res[key].avatar.path == undefined){
            res[key].avatar.path = pseudoPath;
          }else{
            res[key].customPath = 'http://192.168.160.133:4200/assets/uploads/' + res[key].avatar.path
            console.log(res[key].customPath)
          }
        }
        return res[key];
      });
    });
  }


  deleteRelationship(pseudo) {
    let o = { pseudo: pseudo }
    this.http.post<any>(this._deleteRelationshipUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadinvitations();
      }
    )
  }

  cancelInvitation(pseudo) {
    let o = { pseudo: pseudo }
    this.http.post<any>(this._cancelInvitationUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadinvitations();
      }
    )
  }

  acceptInvitation(pseudo) {
    let o = { pseudo: pseudo }
    this.http.post<any>(this._acceptInvitationUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadinvitations();
      }
    )
  }

}
