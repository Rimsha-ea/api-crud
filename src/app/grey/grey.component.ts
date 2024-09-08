import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { FormControl, FormGroup, Validators,} from '@angular/forms';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-grey',
  templateUrl: './grey.component.html',
  styleUrls: ['./grey.component.scss']
})
export class GreyComponent implements OnInit {
  baseURL:string = 'http://localhost:7069/';
  toDoForm!: FormGroup<IToDoForm>;
  todos: Array<{title: string, details: string, id: number, completed: boolean}> = []
  constructor(private readonly httpClient:HttpClient , private readonly toDoService:ToDoService ,private readonly fb: FormBuilder ){
  

    this.toDoForm  = this.fb.group({
      title: new FormControl<string|null>(null,[Validators.required]),
      details: new FormControl<string|null>(null,[Validators.required]),
    })
    this.getTodos()
  }

  ngOnInit() {  }

  addTodo(){
    if(this.toDoForm.invalid) return;
    this.toDoService.addToDo({title: this.toDoForm.get('title')?.value ?? '', details: this.toDoForm.get('details')?.value ?? ''}).subscribe({
      next: (x) => {
        this.toDoForm.reset()
      },
      error: (err) => {

      }
    })
  }
  getTodos(){
    
    this.toDoService.getToDos().subscribe({
      next: (x) => {
        this.todos = x as any
      },
      error: (err) => {

      }
    })
  }
  deleteTodo(todoId: string){
    
    this.toDoService.deleteToDo(todoId).subscribe({
      next: (x) => {
        this.getTodos()
      },
      error: (err) => {

      }
    })
  }
}
interface IToDoForm{
  title: FormControl<string|null>,
  details: FormControl<string|null>,
}