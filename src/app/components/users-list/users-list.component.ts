import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  usersList: Array<IUserModel> = [];
  clicked = true;
  disable =true;
  constructor(private readonly userService: UserService){

 }
 ngOnInit(): void {
   
 }

}
