import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from "@angular/material";
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  dialogRef: any;

  constructor(private _router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
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
