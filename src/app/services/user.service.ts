import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserModel } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    baseURL:string = 'http://localhost:4200/'
 usersList: BehaviorSubject<Array<IUserModel> | null> 
  constructor(private readonly httpClient: HttpClient) {
    this.usersList = new BehaviorSubject<Array<IUserModel> | null>(null);
  }
  getUsers(){
    return this.httpClient.get(`${this.baseURL}get_usersList`)

  }
}
