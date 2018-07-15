import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Requester{
  email: string;
}

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  protected requester = new Requester;
  protected message: string;


  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {}

  sendRequest(){
    this._userService.resetpassword(this.requester)
      .subscribe(
        (res) => {
            console.log(res)
            this._router.navigate(['/login']);
        },
        (err) => {
          this.message = "Error, please try again"
        }
      )
  }

}
