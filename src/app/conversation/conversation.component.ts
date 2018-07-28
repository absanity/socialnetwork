import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';


const SERVER_URL = 'http://192.168.160.133:3000';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  private socket;
  private state = 'small';
  private inputMessage = '';

  constructor() { }

  ngOnInit() {
    console.log('test...');
    this.socket = socketIo(SERVER_URL);

    var theSocket = this.socket;

    this.socket.on('connect', function() {
      console.log('on connect...');
      theSocket.emit('send_token', localStorage.getItem('token'));

    });

  }

  closeChat() {
    console.log('closeChat...');
    this.state = 'small'
  }

  openChat() {
    console.log('openChat...');
    this.state = 'big'
  }

  sendMessage() {
    console.log('sendMessage...');
    console.log(this.inputMessage);
    this.inputMessage = '';

  }

}
