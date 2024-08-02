import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 usersList: BehaviorSubject<Array<IUserModel> | null> 
  constructor() {
    this.usersList = new BehaviorSubject<Array<IUserModel> | null>(null);
  }
}
