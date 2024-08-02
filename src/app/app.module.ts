import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { GreyComponent } from './grey/grey.component';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    GreyComponent,
    UsersComponent,
    UsersListComponent,
    UsersFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
