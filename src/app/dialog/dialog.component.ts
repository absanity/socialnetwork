import {Component, ViewChild} from '@angular/core';
import {EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {UploadService} from '../upload/upload.service';

// import { forkJoin } from 'rxjs/observable/forkJoin';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // @ViewChild('file') file;

  // public files: Set<file> = new Set();
  addFiles() {
    // this.file.nativeElement.click();
  }

  // onFilesAdded() {
  //   const files: { [key: string]: File } = this.file.nativeElement.files;
  //   for (let key in files) {
  //     // if (!isNaN(parseInt(key))) {
  //     //   this.files.add(files[key]);
  //     // }
  //   }
  // }

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<DialogComponent>) {
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      // return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    // this.progress = this.uploadService.upload(this.files);

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    // this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    // forkJoin(allProgressObservables).subscribe(end => {
    //   // ... the dialog can be closed again...
    //   this.canBeClosed = true;
    //   this.dialogRef.disableClose = false;
    //
    //   // ... the upload was successful...
    //   this.uploadSuccessful = true;
    //
    //   // ... and the component is no longer uploading
    //   this.uploading = false;
    // });
  }

  ngOnInit() {
  }

}
