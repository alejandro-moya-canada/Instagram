import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})


export class UserPostsComponent implements OnInit {

  BACKEND_URL_IMAGE = environment.apiImage + "/images/";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UserPostsComponent>) { }

  ngOnInit() {
    console.log("DATAA EN DIALOG:  ", this.data);
    console.log("NICK:  ", this.data["usuario"].nick);
  }

}
