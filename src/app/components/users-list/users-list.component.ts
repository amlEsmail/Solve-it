import {Observable} from 'rxjs';
import {UserModel} from './../../model/user.model';
import {MaintainUsersService} from './../../services/maintain-users.service';
import {Component, OnInit, PipeTransform, ViewChild} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {NgForm} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Route, Router} from '@angular/router';

function search(Users, text: string, pipe: PipeTransform): UserModel[] {
  return Users.filter(user => {
    const term = text.toLowerCase();
    return user.name.toLowerCase().includes(term)
      || pipe.transform(user.email).includes(term)
      || pipe.transform(user.status).includes(term)
      || pipe.transform(user.gender).includes(term);
  });
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [DecimalPipe]
})
export class UsersListComponent implements OnInit {
  users: UserModel[] = [];
  searchedUsers: Observable<UserModel[]>;
  Users: any[] = [];
  page = 1;
  pageSize = 5;
  collectionSize: any;
  searchInfo = '';
  loadingFlg:boolean=true;
  @ViewChild('form') form: NgForm;
  total$: Observable<number>;

  constructor(
    private maintainService: MaintainUsersService,
    private pipe: DecimalPipe,
    private router:Router) {
  }

  ngOnInit() {
    this.maintainService.GetUsers().subscribe(
      (users: any) => {
        this.loadingFlg=false;
        this.Users = users;
        this.maintainService.users=users;
        this.collectionSize = this.Users.length;
        this.refreshUsers();
      },
      (error) => {
        console.log(error);
      }
    );
    this.searchedUsers = this.form.valueChanges.pipe(
      startWith(''),
      map(text => search(this.users, this.searchInfo, this.pipe))
    );
  }

  refreshUsers() {
    if(this.Users.length > 0){
      this.users = this.Users
        .map((user, i) => ({id: i + 1, ...user}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

  }

  showUser(user) {
    this.router.navigate(['/posts',user.id]);
    // this.router.navigate(['/posts',user.id,user.name,user.email,user.status,user.created_at,user.updated_at]);
  }
}
