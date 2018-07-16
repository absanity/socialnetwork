import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-profile-infos',
  templateUrl: './profile-infos.component.html',
  styleUrls: ['./profile-infos.component.css']
})
export class ProfileInfosComponent implements OnInit {

  _pseudo = ''
  _profileInfosUrl = ''
  _inviteUrl = ''
  _deleteRelationshipUrl = ''
  _cancelInvitationUrl = ''
  _acceptInvitationUrl = ''

  private infos: Object = {}


  constructor(private http: HttpClient, private variable: VariableService, private activatedRoute: ActivatedRoute) {
    this._profileInfosUrl = this.variable.getMainUrl() + 'api/profile-infos'
    this._inviteUrl = this.variable.getMainUrl() + 'api/invite'
    this._deleteRelationshipUrl = this.variable.getMainUrl() + 'api/delete-relationship'
    this._cancelInvitationUrl = this.variable.getMainUrl() + 'api/cancel-invitation'
    this._acceptInvitationUrl = this.variable.getMainUrl() + 'api/accept-invitation'


  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._pseudo = params['pseudo'] != undefined ? params['pseudo'] : '';
      this.loadInfos(this._pseudo);
    });
  }

  private loadInfos(pseudo) {
    this.http.get<HttpResponse<any>>(
      this._profileInfosUrl + (pseudo != '' ? '?pseudo=' + pseudo : '')
    ).subscribe(data => {
      this.infos = data;
    });
  }

  invite() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._inviteUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadInfos(this._pseudo);
      }
    )
  }

  deleteRelationship() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._deleteRelationshipUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadInfos(this._pseudo);
      }
    )
  }

  cancelInvitation() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._cancelInvitationUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadInfos(this._pseudo);
      }
    )
  }

  acceptInvitation() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._acceptInvitationUrl, o).subscribe(
      res => {
        console.log('res.....');
        this.loadInfos(this._pseudo);
      }
    )
  }
}
