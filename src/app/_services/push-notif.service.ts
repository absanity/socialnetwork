import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PushNotifService {

  public notifSent:EventEmitter<string> = new EventEmitter();

  constructor() { }

  public sendPushNotif(message:string){
    this.notifSent.emit(message)
  }
}
