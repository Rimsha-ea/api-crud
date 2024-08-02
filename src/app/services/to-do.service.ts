import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})
export class ToDoService {
  baseURL:string = 'http://localhost:7069/'
  constructor(private readonly httpClient: HttpClient) { }

  getToDos(){
    return this.httpClient.get(`${this.baseURL}get_todos`)
  }
  
  addToDo(todo: {title: string; details: string}){
    return this.httpClient.post(`${this.baseURL}add_todo`, todo)
  }

  deleteToDo(id: string){
    return this.httpClient.delete(`${this.baseURL}delete_todo/${id}`)
  }
}
