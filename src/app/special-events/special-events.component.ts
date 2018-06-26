import {Component, OnInit} from '@angular/core';
import {EventService} from '../_services/event.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []

  constructor(private _eventService: EventService,
              private _router: Router) {
  }

  ngOnInit() {
    this._eventService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = Object.keys(res).map(function (key) {
          return res[key];
        }),
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])//if the token authentification failed, the user is redirect to the login page
            }
          }
        }
      )
  }

}
