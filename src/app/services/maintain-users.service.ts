import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";
import { map, take } from 'rxjs/operators';
import {UserModel} from '../model/user.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {PostModel} from '../model/post.model';
@Injectable({
  providedIn: 'root'
})
export class MaintainUsersService {
  usersApi='gorest.co.in/public-api/users';
  postsApi='gorest.co.in/public-api/posts';
  commentsApi:'gorest.co.in/public-api/comments';
  users:UserModel[]=[];
   postDetails = new BehaviorSubject<any>({});
  postClicked = this.postDetails.asObservable();
  constructor(private httpClient:HttpClient) { }
  getSingleUser(userId){
   return _.filter(this.users, {'id': userId});
  }
  GetUsers():any {
    // return users list
    let usersApi = `https://${this.usersApi}/`;
    return this.httpClient.get(usersApi).pipe(
      map( (users)=>{return users['data']}));
  }

  getUserDetails(userId):any{
    let usersApi = `https://${this.usersApi}/${userId}`;
    return this.httpClient.get(usersApi).pipe(
      map((posts)=>{return posts['data']}));
  }

  getPostsPerUser(userId):any{
    let postApi=`https://${this.usersApi}/${userId}/posts`;
    return this.httpClient.get(postApi).pipe(
      map((posts)=>{return posts['data']}));
  }

  getCommentsPerPost(postId):any{
    return this.httpClient.get('https://gorest.co.in/public-api/posts/'+postId+'/comments').pipe(
      map((comments)=>{return comments['data']}));
  }




}
