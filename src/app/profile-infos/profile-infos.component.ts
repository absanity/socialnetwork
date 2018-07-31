import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";

///// SERVICES /////
import { UserService } from '../_services/user.service';
import { PushNotifService } from '../_services/push-notif.service';
import {WebHttp} from "../classes/WebHttp";
import {Websocket} from "../classes/Websocket";


@Component({
  selector: 'app-profile-infos',
  templateUrl: './profile-infos.component.html',
  styleUrls: ['./profile-infos.component.css']
})
export class ProfileInfosComponent implements OnInit {

  _pseudo = ''
  _profileInfosUrl = ''
  _inviteUrl = ''
  _deleteRelationshipUrl = ''
  _cancelInvitationUrl = ''
  _acceptInvitationUrl = ''

  preferences: Array<any> = [];
  private myProfil: boolean = false;
  private avDefault: boolean = false;
  private infos: Object = {avatar:{}}
  protected message:string;
  protected push: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private _userService: UserService, private _pushNotifService: PushNotifService) {
    this._profileInfosUrl = Websocket.URL + '/api/profile-infos'
    this._inviteUrl = Websocket.URL + '/api/invite'
    this._deleteRelationshipUrl = Websocket.URL + '/api/delete-relationship'
    this._cancelInvitationUrl = Websocket.URL + '/api/cancel-invitation'
    this._acceptInvitationUrl = Websocket.URL + '/api/accept-invitation'
    this._pushNotifService.notifSent.subscribe(
      message => {
        this.message = message;
        setTimeout(() =>{
          this.message = undefined;
        }, 2000)
      },
      (err) => {console.log(err)}
    )

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._pseudo = params['pseudo'] != undefined ? params['pseudo'] : '';
      this.loadInfos(this._pseudo);
    });
  }

  private loadInfos(pseudo) {
    this.http.get<HttpResponse<any>>(
      this._profileInfosUrl + (pseudo != '' ? '?pseudo=' + pseudo : '')
    ).subscribe(data => {

      this.infos = data;
      //console.log(data)
      this.preferences = Object.keys(data['preferences']);
      //console.log(this.preferences)
      //console.log(Object.keys(data.preferences))
      let pseudoPath = 'https://api.adorable.io/avatars/200/' + data['pseudo']
      let customPath = '';
      if(this.infos['avatar']['path'] == pseudoPath){
      //  console.log(data["avatar"]["path"] + 'api')
        //this.avDefault = true;
        this.infos['avatar']['path'] = pseudoPath
      } else {
        //console.log('custom')
        //this.avDefault = false;
        this.infos['avatar']['path'] = Websocket.URL + '/uploads/' + this.infos['avatar']['path']
        //console.log(data.avatar.path)
      }
      if(localStorage.getItem('pseudo') == data['pseudo']){
        this.myProfil = true;
      }
    });
  }

  invite() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._inviteUrl, o).subscribe(
      res => {
        //console.log('res.....');
        let message = 'Your invitation has been sent !'
        this._pushNotifService.sendPushNotif(message)
        this.loadInfos(this._pseudo);

      }
    )
  }

  deleteRelationship() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._deleteRelationshipUrl, o).subscribe(
      res => {
        //console.log('res.....');
        let message = 'You will no longer see that person ! :p'
        this._pushNotifService.sendPushNotif(message)
        this.loadInfos(this._pseudo);
      }
    )
  }

  cancelInvitation() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._cancelInvitationUrl, o).subscribe(
      res => {
        //console.log('res.....');
        let message = 'Really ? I cancel the invitation'
        this._pushNotifService.sendPushNotif(message)
        this.loadInfos(this._pseudo);
      }
    )
  }

  acceptInvitation() {
    let o = { pseudo: this._pseudo }
    this.http.post<any>(this._acceptInvitationUrl, o).subscribe(
      res => {
        //console.log('res.....');
        let message = 'Alright ! You\'re now friends '
        this._pushNotifService.sendPushNotif(message)
        this.loadInfos(this._pseudo);
      }
    )
  }

  ////UPLOAD FILES ////
  protected selectedFile: File = null;//create a variable for uploading the files

    public onFileSelected(event){

      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile)
    }
/*
  public onFileSelected(event) {
    console.log(event)
    console.log(this.selectedFile)
    this.selectedFile = <File>event.target.files[0];
  }
*/
  public saveUserData() {
    if (this.selectedFile && this.selectedFile != null) {
   this._userService.uploadFile(this.selectedFile)
     .subscribe(
       res => {
         let message = 'Picture uploaded'
         console.log(res)
         this.loadInfos(this._pseudo)
         this._pushNotifService.sendPushNotif(message)
         /*this.avatar;*/
       },
       err => { console.log(err) }
     )
 }
  }

}
