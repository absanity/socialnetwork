import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VariableService} from "./variable.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = '';
  private _specialEventUrl = '';

  constructor(private http: HttpClient, private variable: VariableService ) {
    this._eventsUrl = variable.getMainUrl() + 'api/events'
    this._specialEventUrl = variable.getMainUrl() + 'api/special'
  }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }// return the array of regular events

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventUrl)
  } // return the array of special events
}
