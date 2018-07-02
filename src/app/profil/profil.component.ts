import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from "@angular/material";
import {DialogComponent} from '../upload/dialog/dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private _router: Router,
              public dialog: MatDialog
              ) {
  }

  ngOnInit() {
  }

  modify() {
    let dialogRef = this.dialog.open(DialogComponent, <any>{
        width: '700px',
        height: '400px',
    });

  /*  const sub = this.dialogRef.componentInstance.onContactAdd.subscribe((event) => {
        this.addContact(event);
    });
    */
  }

}
