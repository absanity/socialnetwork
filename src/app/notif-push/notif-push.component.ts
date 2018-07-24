import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'comp-notif-push',
  templateUrl: './notif-push.component.html',
  styleUrls: ['./notif-push.component.css']
})
export class NotifPushComponent implements OnInit, OnDestroy { //use for clean up

  @ViewChild('modal') myModal:ElementRef;

  @Input()
  get message(){
    return this.msg;
  }
  set message(val:string){
    this.msg = val;
    if(val != undefined){
      this._displayModal();
    }else{
      this._hideModal();
    }
  }
  protected msg:string;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(){
    this._hideModal;
    this.msg = undefined;
  }

  private _displayModal(){
    jQuery(this.myModal.nativeElement).modal();
  }

  private _hideModal(){
    jQuery(this.myModal.nativeElement).modal("hide");
  }

}
