import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoService } from '../services/to-do.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: Array<any> = [];
constructor(private readonly toDoService:ToDoService){

}
  ngOnInit(): void {
    this.toDoService.getToDos().subscribe({
      next: (x: any) =>{
        console.log(x)
        this.todos = x;
      }
    })
  }

}
