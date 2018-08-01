import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Websocket} from "../classes/Websocket";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private globalStats = {};

  constructor(private _router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.loadInfos()
  }

  private loadInfos() {
    this.http.get<HttpResponse<any>>(
      Websocket.URL + "/api/home"
    ).subscribe(data => {
      this.globalStats = data;
      //console.log(data)
      //this.stats = data;
    });
  }

}


//// TO DELETE
/*
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private _auth : AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res['token'])
        this._router.navigate(['/special'])//redirect the user to this route when the connexion is successfull
      },
      err => console.log(err)
    )
  }

}
*/
