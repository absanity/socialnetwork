import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-tuto-invitations',
  templateUrl: './tuto-invitations.component.html',
  styleUrls: ['./tuto-invitations.component.css']
})
export class TutoInvitationsComponent implements OnInit {

  _pseudo = ''
  _invitationsListUrl = ''
  invitations: Array<any> = []

  constructor(private http: HttpClient, private variable: VariableService, private activatedRoute: ActivatedRoute) {
    this._invitationsListUrl = this.variable.getMainUrl() + 'api/invitations'

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
}
