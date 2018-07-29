import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {HttpClient} from "@angular/common/http";

import { Websocket } from "../classes/Websocket"
import {WebsocketService} from "../_services/websocket.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, AfterViewChecked  {

  private socket;
  private state = 'small';
  private inputMessage = '';
  private _chatMessageUrl:string = '';

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  conversations: Object = {};
  currentConversationRef: String = 'room-default';
  historyConversationRef: Array<any> = ['room-default'];
  connectedUsers: Array<any> = [];
  selectedUsers: Array<any> = [];
  highlightedUsers: Object = {  };


  constructor(private http: HttpClient,
              private websocketService: WebsocketService,
  ) {
    this._chatMessageUrl = Websocket.URL + '/api/chat-message'
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

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked ********');
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  initSocket(clone) {
    console.log('initSocket...');
    if(Websocket.socket != null) {
      Websocket.socket.disconnect();
    }


    Websocket.socket = socketIo(Websocket.URL);

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
      console.log(data);

      let key = data['placeType'] + '-' + data['placeName'];
      let message = data.message;
      if(clone.conversations[key] == undefined) {
        clone.conversations[key] = [];
      }
      clone.conversations[key].push({ senderPseudo: data['senderPseudo'], message: message });

      key = 'room-default';
      if(clone.currentConversationRef != key) {
        clone.highlightedUsers[key] = true;
        clone.addToHistory(key);
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

      let key = 'private-'+targetPseudo;
      if(clone.currentConversationRef != key) {
        clone.highlightedUsers[key] = true;
        clone.addToHistory(key);
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

    this.addToHistory(key);


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

  addToHistory(key) {
    console.log('********************************');
    let index = this.historyConversationRef.indexOf(key);
    if(index != -1) {
      this.historyConversationRef.splice(index, 1);
    }
    this.historyConversationRef.push(key);
    console.log(this.historyConversationRef);
  }

  closeCurrentChannel() {

    console.log('closeCurrentChannel...');

    if(this.historyConversationRef.length == 0) {
      this.selectChannel('room', 'default');
      return;
    }

    if(!isUndefined(this.highlightedUsers[this.currentConversationRef.toString()])) {
      delete this.highlightedUsers[this.currentConversationRef.toString()];
    }

    var index, tab, placeType, placeName;


    let currentKey = this.historyConversationRef.pop();

    tab = currentKey.split('-');
    placeType = tab.shift();
    placeName = tab.join('-');

    index = this.selectedUsers.indexOf(placeName);
    if(index != -1) {
      this.selectedUsers.splice(index, 1);
    }


    let previousKey = this.historyConversationRef[this.historyConversationRef.length - 1];
    tab = previousKey.split('-');
    placeType = tab.shift();
    placeName = tab.join('-');

    index = this.selectedUsers.indexOf(placeName);

    if(index != -1) {
      this.selectChannel(placeType, placeName);
    } else {
      this.historyConversationRef = [];
      this.selectChannel('room', 'default');
    }



  }

}
