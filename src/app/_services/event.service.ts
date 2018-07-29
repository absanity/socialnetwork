import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Websocket} from "../classes/Websocket";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = '';
  private _specialEventUrl = '';

  constructor(private http: HttpClient ) {
    this._eventsUrl = Websocket.URL + '/api/events'
    this._specialEventUrl = Websocket.URL + '/api/special'
  }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }// return the array of regular events

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventUrl)
  } // return the array of special events
}
