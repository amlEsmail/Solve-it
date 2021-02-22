import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaintainUsersService} from '../../../services/maintain-users.service';
import {UserModel} from '../../../model/user.model';
import {PostModel} from '../../../model/post.model';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  user:UserModel=new UserModel();
  posts:PostModel[]= [];
  orgPosts:PostModel[]=[];
  page = 1;
  pageSize = 3;
  collectionSize: any;
  loadingFlg:boolean=true;
  constructor(private route:ActivatedRoute,
              private maintainService:MaintainUsersService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.user.id =param['id'];
      this.maintainService.getUserDetails(this.user.id).subscribe((user)=>{
        this.user=user;
      });
    });
    this.maintainService.getPostsPerUser(this.user.id).subscribe((posts)=>{
      this.loadingFlg=false;
      this.orgPosts=posts;
      this.collectionSize=this.orgPosts.length;
      this.refreshPosts();
      }

    )
  }

  refreshPosts() {
    if(this.orgPosts.length > 0){
      this.posts = this.orgPosts
        .map((post, i) => ({id: i + 1, ...post}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

  }

  showComments(post){
    this.maintainService.postDetails.next(post);
    this.router.navigate(['/comments',this.user.id,post.id]);

  }
}
