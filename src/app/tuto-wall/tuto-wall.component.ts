import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";

@Component({
  selector: 'app-tuto-wall',
  templateUrl: './tuto-wall.component.html',
  styleUrls: ['./tuto-wall.component.css']
})
export class TutoWallComponent implements OnInit {

  wallPost: String = '';
  _wallUrl = '';

  constructor(private http: HttpClient, private variable: VariableService) {
    this._wallUrl = this.variable.getMainUrl() + 'api/wall'

  }

  ngOnInit() {
  }

  save() {
    console.log('save...');
    console.log(this.wallPost);
    let o = { message: this.wallPost }
    this.http.post<any>(this._wallUrl, o).subscribe(
      res => {
        console.log('res.....');
      }
    )

    this.wallPost = '';

  }

}
