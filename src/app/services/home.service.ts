import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})


export class HomeService {
  BASE_URL= "http://localhost:8080"
  private socket !:Socket;
  messageArray :any[] = []
  constructor(private httpService: HttpClient) {
    this.getHeaders()
  this.socket = io(this.BASE_URL)
}
headers:any

getHeaders(){
  let token = localStorage.getItem('chatUserToken') || ""
  this.headers = {Authorization : `Bearer ${token}`}
  return this.headers
}

sendMessage(msg:any){
  this.socket.emit('sendMessage', {message:msg})
}

getAllMessages(to:any){
  this.getHeaders()
 return this.httpService.get(`${this.BASE_URL}/chat/messages/${to}`, {headers:this.headers})
}




getListOfUsers(){
  this.getHeaders()
  return this.httpService.get(`${this.BASE_URL}/chat/users`, {headers :this.headers})
}

getSpecificUser(){
  this.getHeaders()
  return this.httpService.get(`${this.BASE_URL}/chat/self`,{headers:this.headers})
}
}
