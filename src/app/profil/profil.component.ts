import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from "@angular/material";
import {DialogComponent} from '../dialog/dialog.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  private _profilUrl = "http://localhost:3000/api/profil";
  dialogRef: any;
  private avatar = "";

  constructor(private _router: Router,
              public dialog: MatDialog,
              private http: HttpClient
            ) {
  }

  ngOnInit() {
    console.log('profil')
    let o = {}
    this.http.get<any>(this._profilUrl, o).subscribe(
      res => {
        console.log(res)
        console.log(res['avatar'])
        this.avatar = res['avatar']
      }
    )
      ,
      err => console.log(err)
    )
    //return this.http.post<any>(this._loginUrl, user)
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
