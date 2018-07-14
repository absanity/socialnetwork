import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-tuto-profile-infos',
  templateUrl: './tuto-profile-infos.component.html',
  styleUrls: ['./tuto-profile-infos.component.css']
})
export class TutoProfileInfosComponent implements OnInit {

  _pseudo = ''
  _profileInfosUrl = ''
  private infos: Object = {}

  constructor(private http: HttpClient, private variable: VariableService, private activatedRoute: ActivatedRoute) {
    this._profileInfosUrl = this.variable.getMainUrl() + 'api/profile-infos'

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._pseudo = params['pseudo'];
      this.loadInfos();
    });
    this.loadInfos();
  }

  private loadInfos() {
    this.http.get<HttpResponse<any>>(
      this._profileInfosUrl + '?pseudo=' + this._pseudo
    ).subscribe(data => {

      this.infos = data;


    });
  }
}
