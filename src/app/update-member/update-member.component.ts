import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WebHttp} from "../classes/WebHttp";
import {Websocket} from "../classes/Websocket";
import {AuthService} from '../_services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {

  private userSource: Object = {preferences: {sustainable: false, social: false, living: false, fort: false, coworking: false, events: false}};
  _pseudo = '';
  _updateMemberUrl = '';
  _updatedMemberUrl = '';

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              //public snackBar: MatSnackBar,
              private router: Router
              ) {
                this._updateMemberUrl = Websocket.URL + '/api/infos',
                this._updatedMemberUrl = Websocket.URL + '/api/update'
              }

  ngOnInit() {
    this.loadInfos();
  }

  private loadInfos() {
    this.http.get<HttpResponse<any>>(
      this._updateMemberUrl
    ).subscribe(data => {
      this.userSource = data;
      //console.log(data)
    });
  }

  onCancelClick() {
    this.router.navigate(['/profile']);
  }

  onValidateClick() {
    //console.log('////VALIDATE///')
    //console.log(this.userSource)
    //console.log(this._updatedMemberUrl)
  //  this.http.post<any>(this._updatedMemberUrl, {content: JSON.stringify(this.userSource)}/*, this.onValidated.bind(this)*/)
    //this.router.navigate(['/profile'])


      this.http.post<any>(this._updatedMemberUrl, this.userSource).subscribe(
        res => {
          //console.log(o);
          this.router.navigate(['/profile'])
        }
      )

  }

  toggleActivate(event, name) {
        this.userSource['preferences'][name] = event.checked;
    }

/*
  onValidated(data){
    this.openSnackBar(data, 'Successfully modified !')
  }
*/
/*  openSnack(data, successMessage = '') {
    if(data['result']){
      this.snackBar.open(successMessage, 'X', <MatSnackBarConfig>{
        duration: 5000,
        extraClasses: ['normal-snackbar']
      })
    }else{
      this.snackBar.open('Erreur: '+data['message'], 'Fermer', <MatSnackBarConfig>{
    duration: 5000,
    extraClasses: ['warning-snackbar']
});
    }
  }*/

}
