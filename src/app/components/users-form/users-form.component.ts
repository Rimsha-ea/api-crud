import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators,} from '@angular/forms';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit{  
    usersList: Array<IUserModel> = [];
    userForm!: FormGroup<IUserForm> ;
    userArray!:IUserModel[];
    disable = true;
    formState: 'Edit' | 'Add' = 'Add';
    userRollNumber: number | null = null;
  constructor(private readonly userService:UserService ,private readonly fb: FormBuilder){
    this.userForm =  this.fb.group({
      firstName: new FormControl<string|null>(null,[Validators.required]),
      lastName: new FormControl<string|null>(null,[Validators.required]),
      active: new FormControl<boolean|null>(false,[Validators.required]),
      email: new FormControl<string|null>(null,[Validators.required]),
      age: new FormControl<number|null>(null,[Validators.required, Validators.min(1)]), 
    })
  }

  ngOnInit(): void {
    this.userService.usersList.subscribe({
     next: (x) => {
       this.usersList = x ?? [];
       console.log('changes in behaviour subject');
       
     }
    })
  }


  onSubmit() {
      console.log(this.userForm.value);
      let users = this.userService.usersList.value;
      let usersCount = 0;

      if(users) usersCount = users.length;
      let rollNo = users ? users[usersCount - 1].rollNo + 1 : usersCount + 1;
      let formValue = this.userForm.value;
      
      if(this.userForm.valid){
        let userToAdd: IUserModel = {
          rollNo: rollNo,
          firstName: formValue.firstName ?? '',
          lastName: formValue.lastName ?? '',
          active: formValue.active ?? false,
          email: formValue.email ?? '',
          age: formValue.age ?? 0
        }
        this.userService.usersList.next([...(this.userService.usersList.value  ?? []), userToAdd]);      
      }
      this.userForm.reset();
  }

 onUpdate(){
  let formValue = this.userForm.value;
  if(this.userForm.valid){
    let userToUpdate: IUserModel = {
      rollNo: this.userRollNumber ?? 0,
      firstName: formValue.firstName ?? '',
      lastName: formValue.lastName ?? '',
      active: formValue.active ?? false,
      email: formValue.email ?? '',
      age: formValue.age ?? 0
    }
    let users = this.userService.usersList.value
    if(users && this.userRollNumber){
      for (let user of users) {
        if(user.rollNo === userToUpdate.rollNo){
          user.rollNo = userToUpdate.rollNo;
          user.firstName = userToUpdate.firstName;
          user.lastName = userToUpdate.lastName;
          user.active = userToUpdate.active;
          user.email = userToUpdate.email;
          user.age = userToUpdate.age;

        }
      }
    }
    this.userService.usersList.next(users);      

  }
  this.onCancel()
}
 onCancel(){
    this.userForm.reset();
    this.formState = 'Add';
    this.userRollNumber =  null;
  }

 onEdit(user: IUserModel){
  this.formState = 'Edit';
      this.disable = false;
      this.userRollNumber = user.rollNo;
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.active,
        email: user.email,
        age: user.age
      })
  }
 onDelete(rollNo:number){
  let users = this.userService.usersList.value
  if(users){
    this.userService.usersList.next(users.filter(x => x.rollNo !== rollNo))
  }
}
}







interface IUserForm{
  firstName: FormControl<string|null>,
  lastName: FormControl<string|null>,
  active:  FormControl<boolean|null>,
  email:  FormControl<string|null>,
  age:  FormControl<number|null>

}

