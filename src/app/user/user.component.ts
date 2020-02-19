import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { userService } from './user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  posts: any;
  usuario: any;
  dataUser = this.userService.dataUser;
  private userId: string;

  BACKEND_URL_IMAGE = environment.apiImage + "/images/";

  constructor( private authService: AuthService, public userService: userService, public route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if( paramMap.get("userId") != "undefined" ) {
        this.userId = paramMap.get("userId");
        console.log("ID USUARIO INICIAL:  ", this.userId);

        this.userService.getUsuario(this.userId).then(userData => {
          console.log("DATOS DEL USUARIO:  ", userData);
          this.usuario = userData;
        });

        this.getPosts(this.userId);

      }
    });

  }

  getPosts(userId: string) {
    this.userService.getPostsByUser(userId).then(postData => {
      console.log("POST DATAA:   ", postData);
      this.posts = postData["posts"];
    })
  }

}
