import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { userService } from './user.service';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( private authService: AuthService, private userService: userService, private postService: PostService ) { }

  ngOnInit() {
    this.refreshUsuario();
  }

  public refreshUsuario() {
    let dataStorage = this.authService.getAuthData(); 
    console.log("DATA STORAGE:  ", dataStorage);

    if(!dataStorage) {
      return;
    }
    console.log("SALTO");
    let userId = dataStorage.userId;this.userService.getUsuario(userId).then(response => {
      console.log("RESPONSE", response);
    });
  }

}
