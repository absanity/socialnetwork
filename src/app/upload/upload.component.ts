import { Component } from '@angular/core';
import {MatDialog} from "@angular/material";

import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  constructor(public uploadService: UploadService,
              public dialog: MatDialog) {}

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, <any>{ width: '50%', height: '50%' });
  }
}
