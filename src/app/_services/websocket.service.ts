import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class WebsocketService {

  @Output() onEvent: EventEmitter<boolean> = new EventEmitter();

  sendEvent(o) {
    this.onEvent.emit(o);
  }

}
