import { Component, OnInit } from '@angular/core';
import { SocketService } from '../app/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  message = '';
  msgList = [];
  userOnline:Number = 0;
  constructor(public socketservice: SocketService) { }

  ngOnInit() {
    this.getMessage();
    this.getOnUser();
  }

  getMessage(){
    this.socketservice.getMessage().subscribe((message) => {
      console.log(message);
      this.msgList.push(message);
    })
  }

  getOnUser(){
    this.userOnline = this.socketservice.getOnUser().subscribe((res)=>{
      console.log(res + ' user online');
      this.userOnline = res as Number;
    });
  }

  sendMessage() {
    if(this.message.length == 0)
      return;
    
    this.socketservice.sendMessage(this.message);
    this.message = '';
  }
}
