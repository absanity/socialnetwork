import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';
import {UploadService} from "./upload.service";

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService]
})
export class UploadModule { }
