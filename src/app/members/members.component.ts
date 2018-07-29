import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl} from '@angular/forms';
import {Observable}  from 'rxjs/Rx';

//// SERVICES ////
import {SearchService} from '../_services/search.service';
import {WebHttp} from "../classes/WebHttp";
import {Websocket} from "../classes/Websocket";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [SearchService]
})
export class MembersComponent implements OnInit {

  searchTerm : FormControl = new FormControl();
  searchResult = [];
  private avDefault: boolean = false;//condition for default picture or custom
  findAFriend: Object = {}; //object with the pseudo
  _membersUrl = ''
  private members: Array<any>;

  constructor(private http: HttpClient,
              private router: Router, private service: SearchService) {
    this._membersUrl = Websocket.URL + '/api/members'
    this.searchTerm.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.service.search_word(data).subscribe(response => {
          console.log(response)
          this.searchResult = response
        })
      })

  }


  ngOnInit() {
    this.loadMembers();

  }

  private loadMembers() {
    var clone = this
    this.http.get<HttpResponse<any>>(
      this._membersUrl
    ).subscribe(res => {
      //console.log(res);//contient tout l'objet
      this.members = Object.keys(res).map(function (key) {
      //console.log(res[key])
      let pseudoPath = 'https://api.adorable.io/avatars/200/' + res[key].pseudo;
      let customPath = ''
      if(res[key].avatar.path == pseudoPath){
        //console.log(res[key].avatar.path + ' api')
        res[key].avDefault = true;
        res[key].customPath = pseudoPath
      }else{
        if(res[key].avatar.path == undefined){
          res[key].avatar.path = pseudoPath;
        }else{
          //console.log(res[key].avatar.path + ' custom')
          res[key].avDefault = false;
          res[key].customPath = WebHttp.URL + '/assets/uploads/' + res[key].avatar.path
        }
      }
      console.log(res[key])
        return res[key];
      })//end map
    });//end subscribe
  }//End load members



  selectMember(pseudo: String) {
    console.log('selectMember ... ' + pseudo);
    this.router.navigate(['/profile'], { queryParams: { pseudo: pseudo }})
  }


  selection(item){
    this.router.navigate(['/profile'], { queryParams: { pseudo: item }})
  }
/*
  findFriend(){
    this.findFriend(this.findAFriend)
    .subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }*/

}
