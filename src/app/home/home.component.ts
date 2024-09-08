import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoService } from '../services/to-do.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: Array<any> = [];
user: any;
constructor(private readonly userService:UserService , httpClient:HttpClient ){
  httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe({
    next: (x: any) => (
      console.log(x)
    )
  })
 
}
  ngOnInit(): void {
    this.userService.usersList.subscribe({
      next: (x: any) =>{
        console.log(x)
        this.users = x;
      }
    })
  }
  



}
