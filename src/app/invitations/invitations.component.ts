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
