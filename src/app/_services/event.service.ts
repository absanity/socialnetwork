import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = 'http://localhost:3000/api/events';
  private _specialEventUrl = 'http://localhost:3000/api/special';

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }// return the array of regular events

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventUrl)
  } // return the array of special events
}
