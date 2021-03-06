import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from "@angular/material";
import {DialogComponent} from '../dialog/dialog.component';
import {HttpClient} from '@angular/common/http';
import {WebHttp} from "../classes/WebHttp";
import {Websocket} from "../classes/Websocket";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  private _profilUrl = "";
  dialogRef: any;
  private avatar = "";

  constructor(private _router: Router,
              public dialog: MatDialog,
              private http: HttpClient) {
    this._profilUrl = Websocket.URL + '/api/profil'
  }

  ngOnInit() {
    //console.log('profil')
    let o = {}
    this.http.get<any>(Websocket.URL + "/api/events", {})
      .subscribe(
        res => console.log(res),
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])//if the token authentification failed, the user is redirect to the login page
            }
          }
        }
      )
  }

  modify() {
    this.dialogRef = this.dialog.open(DialogComponent, <any>{
      width: '200px',
      height: '50px',
      data: {}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
