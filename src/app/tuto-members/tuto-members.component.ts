import { Component, OnInit } from '@angular/core';
import {VariableService} from "../_services/variable.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tuto-members',
  templateUrl: './tuto-members.component.html',
  styleUrls: ['./tuto-members.component.css']
})
export class TutoMembersComponent implements OnInit {

  _membersUrl = ''
  private members: Array<any>;

  constructor(private http: HttpClient, private variable: VariableService,
              private router: Router) {
    this._membersUrl = this.variable.getMainUrl() + 'api/members'

  }


  ngOnInit() {
    this.loadMembers();

  }

  private loadMembers() {
    this.http.get<HttpResponse<any>>(
      this._membersUrl
    ).subscribe(res => {

      console.log(res);
      this.members = Object.keys(res).map(function (key) {
        return res[key];
      })


    });
  }

  selectMember(pseudo: String) {
    console.log('selectMember ... ' + pseudo);
    this.router.navigate(['/tuto-profile'], { queryParams: { pseudo: pseudo }})
  }

}
