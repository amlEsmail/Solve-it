import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserPostsComponent } from './components/users-list/user-posts/user-posts.component';
import { PostCommentsComponent } from './components/users-list/user-posts/post-comments/post-comments.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule,Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes:Routes=[
  // { path:'',redirectTo:"/users",pathMatch: 'full'},
  { path:'',component:HomeComponent},
  {path:'Users',component:UsersListComponent},
  {path:'posts/:id',component:UserPostsComponent},
  {path:'comments/:uid/:pid',component:PostCommentsComponent},
  // {path:'posts/:id/:name/:email/:status/:createDate/:updateDate',component:UserPostsComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserPostsComponent,
    PostCommentsComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(
      routes
      ,{scrollPositionRestoration: 'enabled'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
