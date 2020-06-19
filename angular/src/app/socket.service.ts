import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  socket_endpoint = 'http://localhost:3000';

  constructor() { 
    this.socket = io(this.socket_endpoint);
  }

  sendMessage(msg){  
    this.socket.emit('new-message',msg);
  }

  getMessage(){
    return Observable.create((observer)=>{
      this.socket.on('new-message',(message)=>{
        observer.next(message);
      })
    })
  }

  getOnUser(){
    return Observable.create((observer)=>{
      this.socket.on('on-user',(count)=>{
        observer.next(count);
      })
    })
  }
}
