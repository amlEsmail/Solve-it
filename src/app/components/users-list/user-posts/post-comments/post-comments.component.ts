import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaintainUsersService} from '../../../../services/maintain-users.service';
import {UserModel} from '../../../../model/user.model';
import {PostModel} from '../../../../model/post.model';
import {CommentModel} from '../../../../model/comment.model';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  user:UserModel=new UserModel();
  comments:CommentModel[]= [];
  orgComments:CommentModel[]=[];
  page = 1;
  pageSize = 3;
  collectionSize: any;
  postId:any;
  loadingFlg:boolean=true;
  post:any;
  constructor(private route:ActivatedRoute,
              private maintainService:MaintainUsersService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((param:Params)=>{
      this.user.id =param['uid'];
      this.postId=param['pid']
      this.maintainService.getUserDetails(this.user.id).subscribe((user)=>{
        this.user=user;
      });
    });
    this.maintainService.getCommentsPerPost(this.postId).subscribe((comments)=>{
      this.loadingFlg=false;
      this.orgComments=comments;
      this.collectionSize=comments.length;
      this.refreshComments();
    });
    this.maintainService.postClicked.subscribe((details)=>{
     this.post = details;
    })
  }


  goToPosts(){
    this.router.navigate(['/posts',this.user.id]);
  }

  refreshComments(){
    if(this.orgComments.length > 0 ){
      this.comments = this.orgComments
        .map((post, i) => ({id: i + 1, ...post}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

  }
}
