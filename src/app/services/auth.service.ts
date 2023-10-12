import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL  = "http://localhost:8080"


  constructor(private httpService :HttpClient) { }

  login(data:any){
    return this.httpService.post(`${this.BASE_URL}/auth/login`,data)
  }

  register(data:any){
    return this.httpService.post(`${this.BASE_URL}/auth/register`,data)
  }

}
