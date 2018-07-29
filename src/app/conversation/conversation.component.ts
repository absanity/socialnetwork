import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../_services/variable.service";

import { Websocket } from "../classes/Websocket"
import {WebsocketService} from "../_services/websocket.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  private socket;
  private state = 'small';
  private inputMessage = '';
  private _chatMessageUrl:string = '';


  conversations: Object = {};
  currentConversationRef: String = 'room-default';
  connectedUsers: Array<any> = [];
  selectedUsers: Array<any> = [];
  highlightedUsers: Object = {  };

  constructor(private http: HttpClient,
              private variable: VariableService,
              private websocketService: WebsocketService
  ) {
    this._chatMessageUrl = this.variable.getMainUrl() + 'api/chat-message'
  }

  ngOnInit() {
    console.log('conversation ngOnInit....');
    var clone = this;
    this.websocketService.onEvent.subscribe(o => {
      console.log('this.websocketService.change.subscribe **********');
      console.log(o);
      if(o.type == 'connect') {
        clone.initSocket(clone);
      }
    });
    this.initSocket(this);
  }

  initSocket(clone) {
    console.log('initSocket...');
    Websocket.socket = socketIo(Websocket.SERVER_URL);

    // var clone = this;

    Websocket.socket.on('connect', function() {
      console.log('*** on connect...');
      Websocket.socket.emit('send_token', localStorage.getItem('token'));

    });
    Websocket.socket.on('disconnect', function(data) {
      console.log('*** on disconnect...');
      clone.connectedUsers = data['connectedUsers'];
    });
    Websocket.socket.on('token_check', function(data) {
      console.log('*** on token_check...');
      console.log(data);

    });
    Websocket.socket.on('connected_users', function(data) {
      console.log('*** on connected_users...');
      console.log(data);
      clone.connectedUsers = data;

    });

    Websocket.socket.on('message', function(data) {
      console.log('*** on message...');

      let key = data['placeType'] + '-' + data['placeName'];
      let message = data.message;
      if(clone.conversations[key] == undefined) {
        clone.conversations[key] = [];
      }
      clone.conversations[key].push({ senderPseudo: data['senderPseudo'], message: message });

      if(clone.currentConversationRef != 'room-default') {
        clone.highlightedUsers['room-default'] = true;
      }

    });

    Websocket.socket.on('message-private-to-source', function(data) {
      console.log('*** on message-private-to-source...');

      let senderPseudo = data['senderPseudo'];
      let targetPseudo = data['placeName'];
      clone.addMessage(clone, senderPseudo, targetPseudo, data['message']);

    });

    Websocket.socket.on('message-private-to-target', function(data) {
      console.log('*** on message-private-to-target...');

      if(data['senderPseudo'] == localStorage.getItem('pseudo')) {
        console.log('same pseudo for source');
        return;
      }
      let senderPseudo = data['senderPseudo'];
      let targetPseudo = data['senderPseudo'];
      clone.addMessage(clone, senderPseudo, targetPseudo, data['message']);

      if(clone.currentConversationRef != 'private-'+targetPseudo) {
        clone.highlightedUsers['private-'+targetPseudo] = true;
      }

    });


  }

  addMessage(clone, senderPseudo, targetPseudo, message) {
    if(clone.selectedUsers.indexOf(targetPseudo) == -1) {
      clone.selectedUsers.push(targetPseudo);
    }
    let key = 'private-' + targetPseudo;
    if(clone.conversations[key] == undefined) {
      clone.conversations[key] = [];
    }
    clone.conversations[key].push({ senderPseudo: senderPseudo, message: message });
  }

  closeChat() {
    console.log('closeChat...');
    this.state = 'small'
  }

  openChat() {
    console.log('openChat...');
    this.state = 'big'
  }

  selectChannel(type, pseudo) {

    console.log('selectChannel: ...' + type + ' / ' + pseudo);
    console.log(this.selectedUsers.indexOf(type + '-' + pseudo));
    let key;
    if(type == 'private') {
      if(this.selectedUsers.indexOf(pseudo) == -1) {
        this.selectedUsers.push(pseudo);
      }
      key = 'private-' + pseudo;
    } else {
      key = 'room-default';
    }

    this.currentConversationRef = key;

    if(!isUndefined(this.highlightedUsers[key])) {
      delete this.highlightedUsers[key];
    }


  }

  validateInput() {
    console.log('validateInput...');
    let tab = this.currentConversationRef.split('-');
    let placeType = tab.shift();
    let placeName = tab.join('-');
    console.log('placeType: ' + placeType);
    console.log('placeName: ' + placeName);
    let o = { placeType: placeType, placeName: placeName, message: this.inputMessage }
    var clone = this;
    this.http.post<any>(this._chatMessageUrl, o).subscribe(
      res => {
        console.log('validateInput res.....');
        clone.inputMessage = '';
      }
    )
  }

}
