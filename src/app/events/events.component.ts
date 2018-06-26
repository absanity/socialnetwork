import {Component, OnInit} from '@angular/core';
import {EventService} from '../_services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []

  constructor(private _eventService: EventService) {
  }

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe(
        res => this.events = Object.keys(res).map(function (key) {
          return res[key];
        })
        ,
        err => console.log(err)
      )
  }
}
